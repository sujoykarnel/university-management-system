import { format } from "date-fns";
import httpStatus from "http-status";
import PDFDocument from "pdfkit";
import {
	PaymentStatus,
	RegistrationStatus,
} from "../../../generated/prisma/enums";
import config from "../../config";
import { getBkashIdToken } from "../../lib/bkash";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import type { RequestUser } from "../../middleware/checkAuth";
import { AppError } from "../../utils/AppError";
import type {
	ICourseRefistrationPayload,
	IPayCourseRegistrationPayload,
} from "./courseRegistration.interfate";

const createCourseRegistration = async (
	payload: ICourseRefistrationPayload,
	user: RequestUser,
) => {
	const transectionResult = await prisma.$transaction(async (tx) => {
		const student = await tx.student.findUnique({
			where: { userId: user.userId },
		});

		if (!student) {
			throw new AppError(httpStatus.NOT_FOUND, "Student Profile Not Found");
		}

		const offeredCourse = await tx.courseOffering.findUnique({
			where: { id: payload.courseOfferingId },
		});

		if (!offeredCourse || offeredCourse.isDelete) {
			throw new AppError(httpStatus.NOT_FOUND, "Course Not Found");
		}

		const existingCourseRegistration = await tx.courseRegistration.findFirst({
			where: {
				studentId: student.id,
				courseOfferingId: offeredCourse.id,
			},
		});

		if (existingCourseRegistration?.status === RegistrationStatus.PENDING) {
			throw new AppError(
				httpStatus.BAD_REQUEST,
				"Course Registration Pending. Please Pay For That To Confirm",
			);
		}

		if (existingCourseRegistration?.status === RegistrationStatus.CONFIRMED) {
			throw new AppError(
				httpStatus.BAD_REQUEST,
				"Course Already Registred This Course",
			);
		}

		if (offeredCourse.availableSeat === 0) {
			throw new AppError(httpStatus.BAD_REQUEST, "Seat Not Available");
		}

		if (!offeredCourse.courseFee) {
			throw new AppError(httpStatus.BAD_REQUEST, "Course Fee Not Set Yet");
		}

		const registration = await tx.courseRegistration.create({
			data: {
				status: RegistrationStatus.PENDING,
				studentId: student.id,
				courseOfferingId: offeredCourse.id,
			},
		});

		const bkashIdToken = await getBkashIdToken();

		if (!bkashIdToken) {
			throw new AppError(httpStatus.BAD_GATEWAY, "No Bkash Access Token Found");
		}

		const bkashCreatePaymentResponse = await fetch(
			`${config.bkash_base_url}/tokenized/checkout/create`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: bkashIdToken,
					"X-App-Key": config.bkash_app_key,
				},
				body: JSON.stringify({
					mode: "0011",
					// payerReference: "0123456789", //user email or phone number
					payerReference: user.email, //user email or phone number
					callbackURL: `${config.bkash_callback_url}/course-registration/payment/callback`,
					amount: offeredCourse.courseFee.toString(),
					currency: "BDT",
					intent: "sale",
					// merchantInvoiceNumber: "Inv4" // apppointment id
					merchantInvoiceNumber: registration.id, // apppointment id
				}),
			},
		);

		const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json();

		await tx.payment.create({
			data: {
				merchantInvoiceNumber: bkashCreatePaymentResult.merchantInvoiceNumber,
				courseRegistationId: registration.id,
				amount: offeredCourse.courseFee.toString(),
				gatewayResponse: bkashCreatePaymentResult,
				bkashPaymentId: bkashCreatePaymentResult.paymentID,
				payerReference: user.email,
			},
		});

		return {
			paymentUrl: bkashCreatePaymentResult.bkashURL,
		};
	});

	return transectionResult;
};

const courseRegistrationCallback = async (query: Record<string, any>) => {
	const transectionResult = await prisma.$transaction(
		async (tx) => {
			const paymentId = query.paymentID;

			if (!paymentId) {
				throw new AppError(httpStatus.BAD_REQUEST, "Payment Id Missing");
			}

			const status = query.status;

			if (!status) {
				throw new AppError(httpStatus.BAD_REQUEST, "Payment Status Is Missing");
			}

			const bkashIdToken = await getBkashIdToken();

			if (!bkashIdToken) {
				throw new AppError(
					httpStatus.BAD_REQUEST,
					"No Bkash Access Token Found",
				);
			}

			const executedPaymentResponse = await fetch(
				`${config.bkash_base_url}/tokenized/checkout/execute`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: bkashIdToken,
						"X-App-Key": config.bkash_app_key,
					},

					body: JSON.stringify({
						paymentID: paymentId,
					}),
				},
			);

			const executedPaymentResult = await executedPaymentResponse.json();

			if (status === "success") {
				const resitation = await prisma.courseRegistration.findUnique({
					where: {
						id: executedPaymentResult.merchantInvoiceNumber,
					},
					include: {
						student: true,
						courseOffering: {
							include: {
								course: {
									include: {
										program: {
											include: {
												department: {
													include: {
														university: true,
													},
												},
											},
										},
									},
								},
							},
						},
					},
				});

				if (!resitation) {
					throw new AppError(
						httpStatus.NOT_FOUND,
						"Course Registration Not Found!",
					);
				}

				await tx.courseRegistration.update({
					where: { id: executedPaymentResult.merchantInvoiceNumber },
					data: {
						status: RegistrationStatus.CONFIRMED,
					},
				});

				const newAvailableSeat = resitation.courseOffering.availableSeat - 1;

				await tx.courseOffering.update({
					where: {
						id: resitation.courseOffering.id,
					},
					data: {
						availableSeat: newAvailableSeat,
					},
				});

				await tx.payment.update({
					where: {
						courseRegistationId: executedPaymentResult.merchantInvoiceNumber,
						bkashPaymentId: paymentId,
					},
					data: {
						status: PaymentStatus.PAID,
						bkashTrxId: executedPaymentResult.trxID,
						paidAt: executedPaymentResult.paymentExecuteTime,
						gatewayResponse: executedPaymentResult,
					},
				});

				const pdfDocument = new PDFDocument({
					size: "A4",
					margin: 50,
				});

				const pdfChunks: Buffer[] = [];

				pdfDocument.on("data", (chunk: Buffer) => {
					pdfChunks.push(chunk);
				});

				const pdfReadyPromise = new Promise<Buffer>((resolve, reject) => {
					pdfDocument.on("end", () => {
						resolve(Buffer.concat(pdfChunks));
					});

					pdfDocument.on("error", reject);
				});

				// ==============================
				// Helper Functions
				// ==============================

				const drawLine = (y: number) => {
					pdfDocument
						.strokeColor("#D1D5DB")
						.lineWidth(1)
						.moveTo(50, y)
						.lineTo(545, y)
						.stroke();
				};

				const drawLabelValue = (label: string, value: string, y: number) => {
					pdfDocument
						.fontSize(10)
						.fillColor("#6B7280")
						.font("Helvetica")
						.text(label, 55, y, {
							width: 150,
						});

					pdfDocument
						.fontSize(10)
						.fillColor("#111827")
						.font("Helvetica-Bold")
						.text(value || "N/A", 205, y, {
							width: 330,
						});
				};

				// ==============================
				// Header
				// ==============================

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(20)
					.fillColor("#111827")
					.text("UNIVERSITY MANAGEMENT SYSTEM", {
						align: "center",
					});

				pdfDocument
					.moveDown(0.3)
					.font("Helvetica")
					.fontSize(10)
					.fillColor("#6B7280")
					.text("UMS | Academic & Payment Management", {
						align: "center",
					});

				pdfDocument.moveDown(1);

				drawLine(pdfDocument.y);

				pdfDocument.moveDown(1);

				// ==============================
				// Invoice Title
				// ==============================

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(22)
					.fillColor("#111827")
					.text("PAYMENT INVOICE", {
						align: "left",
					});

				pdfDocument
					.font("Helvetica")
					.fontSize(9)
					.fillColor("#6B7280")
					.text("Official payment receipt", 50, pdfDocument.y + 5);

				// Payment status
				pdfDocument
					.roundedRect(455, 145, 90, 28, 5)
					.fillColor("#DCFCE7")
					.fill();

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(10)
					.fillColor("#166534")
					.text("PAID", 455, 154, {
						width: 90,
						align: "center",
					});

				pdfDocument.moveDown(2);

				// ==============================
				// Invoice Information
				// ==============================

				const invoiceInfoY = pdfDocument.y;

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(10)
					.fillColor("#111827")
					.text("INVOICE INFORMATION", 50, invoiceInfoY);

				drawLabelValue(
					"Transaction ID",
					executedPaymentResult.trxID,
					invoiceInfoY + 25,
				);

				drawLabelValue("Payment Method", "bKash", invoiceInfoY + 43);

				drawLabelValue(
					"Payment Date",
					format(executedPaymentResult.paymentExecuteTime, "dd-MMM-yyyy"),
					invoiceInfoY + 61,
				);

				// ==============================
				// Student / Patient Information
				// ==============================

				const studentInfoY = invoiceInfoY + 105;

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(10)
					.fillColor("#111827")
					.text("STUDENT INFORMATION", 50, studentInfoY);

				drawLabelValue(
					"Name",
					resitation.student?.name ?? "N/A",
					studentInfoY + 25,
				);

				drawLabelValue(
					"Email",
					resitation.student?.email ?? "N/A",
					studentInfoY + 43,
				);

				// ==============================
				// University Information
				// ==============================

				const universityName =
					resitation.courseOffering.course.program.department.university.name;

				const departmentName =
					resitation.courseOffering.course.program.department.name;

				const programName = resitation.courseOffering.course.program.name;

				const courseName = resitation.courseOffering.course.title;

				const academicInfoY = studentInfoY + 90;

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(10)
					.fillColor("#111827")
					.text("ACADEMIC INFORMATION", 50, academicInfoY);

				drawLabelValue("University", universityName, academicInfoY + 25);

				drawLabelValue("Department", departmentName, academicInfoY + 43);

				drawLabelValue("Program", programName, academicInfoY + 61);

				drawLabelValue("Course", courseName, academicInfoY + 79);

				// ==============================
				// Payment Summary
				// ==============================

				const summaryY = academicInfoY + 125;

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(12)
					.fillColor("#111827")
					.text("PAYMENT SUMMARY", 50, summaryY);

				drawLine(summaryY + 22);

				// Table Header
				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(10)
					.fillColor("#6B7280")
					.text("DESCRIPTION", 55, summaryY + 35);

				pdfDocument.text("AMOUNT", 430, summaryY + 35, {
					width: 100,
					align: "right",
				});

				drawLine(summaryY + 55);

				// Payment Item
				pdfDocument
					.font("Helvetica")
					.fontSize(10)
					.fillColor("#111827")
					.text("Course / Academic Payment", 55, summaryY + 70);

				pdfDocument.text(
					`${executedPaymentResult.amount} BDT`,
					430,
					summaryY + 70,
					{
						width: 100,
						align: "right",
					},
				);

				drawLine(summaryY + 95);

				// Total
				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(12)
					.fillColor("#111827")
					.text("TOTAL PAID", 55, summaryY + 112);

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(14)
					.fillColor("#111827")
					.text(`${executedPaymentResult.amount} BDT`, 400, summaryY + 110, {
						width: 130,
						align: "right",
					});

				// ==============================
				// Payment Confirmation Box
				// ==============================

				const confirmationY = summaryY + 160;

				pdfDocument
					.roundedRect(50, confirmationY, 495, 65, 6)
					.fillColor("#F0FDF4")
					.fill();

				pdfDocument
					.font("Helvetica-Bold")
					.fontSize(10)
					.fillColor("#166534")
					.text("PAYMENT CONFIRMED", 65, confirmationY + 15);

				pdfDocument
					.font("Helvetica")
					.fontSize(9)
					.fillColor("#166534")
					.text(
						"Your payment has been successfully processed through bKash.",
						65,
						confirmationY + 32,
					);

				// ==============================
				// Footer
				// ==============================

				const footerY = 750;

				drawLine(footerY);

				pdfDocument
					.font("Helvetica")
					.fontSize(8)
					.fillColor("#6B7280")
					.text(
						"This is a computer-generated invoice and does not require a signature.",
						50,
						footerY + 12,
						{
							align: "center",
							width: 495,
						},
					);

				pdfDocument
					.fontSize(8)
					.fillColor("#9CA3AF")
					.text("University Management System (UMS)", 50, footerY + 27, {
						align: "center",
						width: 495,
					});

				// Finish PDF
				pdfDocument.end();

				const pdfBuffer = await pdfReadyPromise;

				await transporter.sendMail({
					from: config.smtp_sender,
					to: resitation.student.email,
					subject: "Your Cousere Registration Invoice - UMS",
					text: "Thank you for registration a course. Please find your invoice attached.",
					attachments: [
						{
							filename: "invoice.pdf",
							content: pdfBuffer,
						},
					],
				});

				return {
					redirectUrl: `${config.frontend_url}/dashboard/my-courses?status=success`,
				};
			} else if (status === "failure") {
				await tx.payment.update({
					where: {
						bkashPaymentId: paymentId,
					},
					data: {
						status: PaymentStatus.FAILED,
						gatewayResponse: executedPaymentResult,
					},
				});
				return {
					redirectUrl: `${config.frontend_url}/dashboard/my-courses?status=failue`,
				};
			} else if (status === "cancel") {
				await tx.payment.update({
					where: {
						bkashPaymentId: paymentId,
					},
					data: {
						status: PaymentStatus.CANCELED,
						gatewayResponse: executedPaymentResult,
					},
				});
				return {
					executedPaymentResult,
					redirectUrl: `${config.frontend_url}/dashboard/my-courses?status=cancel`,
				};
			} else {
				return {
					executedPaymentResult,
					redirectUrl: `${config.frontend_url}/dashboard/my-courses?error=payment-failed`,
				};
			}
		},
		{
			maxWait: 10000, // default: 2000
			timeout: 30000, // default: 5000
		},
	);
	return transectionResult;
};

const payCourseRegistration = async (
	payload: IPayCourseRegistrationPayload,
	user: RequestUser,
) => {
	const transectionResult = await prisma.$transaction(async (tx) => {
		const registationId = payload.courseRegistrationId;

		const existingRegistraion = await tx.courseRegistration.findUnique({
			where: { id: registationId },
			include: {
				courseOffering: true,
			},
		});

		if (!existingRegistraion) {
			throw new AppError(httpStatus.NOT_FOUND, "Course Registration Not Found");
		}

		if (existingRegistraion.status !== RegistrationStatus.PENDING) {
			throw new AppError(
				httpStatus.BAD_REQUEST,
				"Course Registration Not Pending",
			);
		}

		const bkashIdToken = await getBkashIdToken();

		if (!bkashIdToken) {
			throw new AppError(httpStatus.BAD_REQUEST, "No Bkash Access Token Found");
		}

		const bkashCreatePaymentResponse = await fetch(
			`${config.bkash_base_url}/tokenized/checkout/create`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: bkashIdToken,
					"X-App-Key": config.bkash_app_key,
				},
				body: JSON.stringify({
					mode: "0011",
					// payerReference: "0123456789", //user email or phone number
					payerReference: user.email, //user email or phone number
					callbackURL: `${config.bkash_callback_url}/course-registration/payment/callback`,
					amount: existingRegistraion.courseOffering.courseFee.toString(),
					currency: "BDT",
					intent: "sale",
					// merchantInvoiceNumber: "Inv4" // apppointment id
					merchantInvoiceNumber: existingRegistraion.id, // apppointment id
				}),
			},
		);

		const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json();

		await tx.payment.update({
			where: {
				courseRegistationId: existingRegistraion.id,
			},

			data: {
				merchantInvoiceNumber: bkashCreatePaymentResult.merchantInvoiceNumber,
				gatewayResponse: bkashCreatePaymentResult,
				bkashPaymentId: bkashCreatePaymentResult.paymentID,
			},
		});

		return {
			paymentUrl: bkashCreatePaymentResult.bkashURL,
		};
	});

	return transectionResult;
};



export const CourseRegistrationService = {
	createCourseRegistration,
	payCourseRegistration,
	courseRegistrationCallback,
};
