import bcrypt from "bcryptjs";
import type { UploadApiResponse } from "cloudinary";
import httpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";
import config from "../../config";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
	IDepartmentPayload,
	IInstructorCreatePayload,
	IProgramPayload,
	IUniversityPayload,
} from "./admin.interface";

const createUniversity = async (payload: IUniversityPayload) => {
	const { name, shortName } = payload;

	const university = await prisma.university.create({
		data: {
			name,
			shortName,
		},
	});

	return university;
};

const createDepartment = async (payload: IDepartmentPayload) => {
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

const createProgram = async (payload: IProgramPayload) => {
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

const createCourse = async () => {};

export const AdminService = {
	createUniversity,
	createDepartment,
	createProgram,
	createInstructor,
	createCourse,
};
