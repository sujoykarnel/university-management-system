import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { IResultCreatePayload } from "./result.interface";

const createResult = async (payload: IResultCreatePayload) => {
	const { examId, courseRegistrationId, grade, gradePoint, marks } = payload;

	const isCourseRedistrationExists = await prisma.courseRegistration.findUnique(
		{
			where: { id: courseRegistrationId },
			include: {
				courseOffering: true,
			},
		},
	);

	if (!isCourseRedistrationExists) {
		throw new AppError(httpStatus.NOT_FOUND, "Course Not Found");
	}

	const isExamExists = await prisma.exam.findUnique({
		where: { id: examId },
		include: {
			courseOffering: true,
		},
	});

	if (!isExamExists) {
		throw new AppError(httpStatus.NOT_FOUND, "Exam Not Found");
	}

	if (
		isCourseRedistrationExists.courseOfferingId !==
		isExamExists.courseOfferingId
	) {
		throw new AppError(httpStatus.FORBIDDEN, "Offered Course Not Matched");
	}

	const result = await prisma.result.create({
		data: {
			examId,
			courseRegistrationId,
			grade,
			gradePoint,
			marks,
		},
		include: {
			exam: {
				include: {
					courseOffering: {
						include: {
							course: true,
						},
					},
				},
			},
		},
	});

	return result;
};

export const ResultService = {
	createResult,
};
