import bcrypt from "bcryptjs";
import type { UploadApiResponse } from "cloudinary";
import httpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";
import config from "../../config";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
	ICourseCreatePayload,
	ICourseOfferingCreatePayload,
	IDepartmentCreatePayload,
	IInstructorCreatePayload,
	IProgramCreatePayload,
	ISemesterCreatePayload,
	IUniversityCreatePayload,
} from "./admin.interface";

const createUniversity = async (payload: IUniversityCreatePayload) => {
	const { name, shortName } = payload;

	const university = await prisma.university.create({
		data: {
			name,
			shortName,
		},
	});

	return university;
};

const createDepartment = async (payload: IDepartmentCreatePayload) => {
	const { name, code, universityId } = payload;

	const department = await prisma.department.create({
		data: {
			name,
			code,
			universityId,
		},
		include: {
			university: true,
		},
	});

	return department;
};

const createProgram = async (payload: IProgramCreatePayload) => {
	const { name, code, duration, totalCredits, departmentId } = payload;

	const program = await prisma.program.create({
		data: {
			name,
			code,
			duration,
			totalCredits,
			departmentId,
		},
		include: { department: true },
	});

	return program;
};

const createInstructor = async (
	payload: IInstructorCreatePayload,
	resume: Express.Multer.File | null,
	additionalFiles: Express.Multer.File[],
) => {
	const isUserExisting = await prisma.user.findUnique({
		where: { email: payload.user.email },
	});

	if (isUserExisting) {
		throw new AppError(
			httpStatus.CONFLICT,
			"User Already Existis With This Email",
		);
	}

	const resumeUploadResult = await new Promise<UploadApiResponse>(
		(resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ resource_type: "auto" }, async (error, result) => {
					if (error) {
						return reject(error);
					}

					if (!result) {
						return reject(new Error("No Result Return From Cloudinary"));
					}
					resolve(result);
				})
				.end(resume?.buffer);
		},
	);

	const additionalFilesUploadResults = await Promise.all(
		additionalFiles.map((file) => {
			return new Promise<UploadApiResponse>((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ resource_type: "auto" }, async (error, result) => {
						if (error) {
							return reject(error);
						}

						if (!result) {
							return reject(new Error("No Result Return From Cloudinary"));
						}
						resolve(result);
					})
					.end(file?.buffer);
			});
		}),
	);

	const hashedPassword = await bcrypt.hash(
		payload.user.password,
		Number(config.bcrypt_salt_rounds),
	);

	const instructor = await prisma.user.create({
		data: {
			name: payload.user.name,
			email: payload.user.email,
			password: hashedPassword,
			needPasswordChange: true,
			emailVerified: true,
			role: Role.INSTRUCTOR,
			instuctor: {
				create: {
					name: payload.user.name,
					email: payload.user.email,
					departmentId: payload.instructor.departmentId,
					address: payload.instructor.address,
					resume: resumeUploadResult.secure_url,
					resumePublicId: resumeUploadResult.public_id,
					additionalFiles: additionalFilesUploadResults.map((file) => ({
						url: file.secure_url,
						publicId: file.public_id,
					})),
				},
			},
		},
		omit: {
			password: true,
		},
		include: {
			instuctor: {
				include: {
					department: true,
				},
			},
		},
	});

	return instructor;
};

const createCourse = async (payload: ICourseCreatePayload) => {
	const { title, code, credit, semesterNo, programId } = payload;

	const course = prisma.course.create({
		data: {
			title,
			code,
			credit,
			semesterNo,
			programId,
		},
		include: {
			program: true,
		},
	});

	return course;
};

const createSemester = async (payload: ISemesterCreatePayload) => {
	const { name, year, startDate, endDate } = payload;

	const semester = prisma.semester.create({
		data: {
			name,
			year,
			startDate,
			endDate,
		},
	});

	return semester;
};

const createCourseOffering = async (payload: ICourseOfferingCreatePayload) => {
	const { courseId, semesterId, instructorId, courseFee, totalSeat } = payload;

	const semester = prisma.courseOffering.create({
		data: {
			courseId,
			semesterId,
			instructorId,
			courseFee,
			totalSeat,
			availableSeat: totalSeat,
		},
	});

	return semester;
};

export const AdminService = {
	createUniversity,
	createDepartment,
	createProgram,
	createInstructor,
	createCourse,
	createSemester,
	createCourseOffering,
};
