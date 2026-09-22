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
import type { ICourseRefistrationPayload, IPayCourseRegistrationPayload } from "./courseRegistration.interfate";

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
				getwayResponse: bkashCreatePaymentResult,
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
						courseOffering: true,
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
						getwayResponse: executedPaymentResult,
					},
				});

				const pdfDocument = new PDFDocument({ margin: 50 });

				const pdfChunks: Buffer[] = [];

				pdfDocument.on("data", (chunk: Buffer) => {
					pdfChunks.push(chunk);
				});

				const pdfReadyPromise = new Promise<Buffer>((resolve) => {
					pdfDocument.on("end", () => {
						resolve(Buffer.concat(pdfChunks));
					});
				});

				pdfDocument
					.fontSize(20)
					.text("PH Healthcare System", { align: "center" });
				pdfDocument
					.fontSize(14)
					.text("Appointment Invoice", { align: "center" });
				pdfDocument.moveDown(2);

				pdfDocument
					.fontSize(12)
					.text(`Patient Name: ${resitation.student?.name}`);
				pdfDocument.text(`Patient Email: ${resitation.student?.email}`);
				pdfDocument.moveDown();

				pdfDocument.text(`Amount Paid: ${executedPaymentResult.amount} BDT`);
				pdfDocument.text(`Payment Method: bKash`);
				pdfDocument.text(`Transaction Id: ${executedPaymentResult.trxID}`);
				pdfDocument.text(
					`Paid At: ${executedPaymentResult.paymentExecuteTime}`,
				);

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
						getwayResponse: executedPaymentResult,
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
						getwayResponse: executedPaymentResult,
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


const payCourseRegistration = async(payload: IPayCourseRegistrationPayload, user: RequestUser)=>{
  

}

export const CourseRegistrationService = {
	createCourseRegistration,
	payCourseRegistration,
	courseRegistrationCallback,
};
