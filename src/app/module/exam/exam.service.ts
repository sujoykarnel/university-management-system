import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { IExamCreatePayload } from "./exam.interface";

const createExam = async (payload: IExamCreatePayload) => {
	const { type, examDate, toalMarks, courseOfferingId } = payload;

	const offeredCourse = await prisma.courseOffering.findFirst({
		where: {
			id: courseOfferingId,
		},
	});

	if (!offeredCourse) {
		throw new AppError(httpStatus.NOT_FOUND, "Course Not Found");
	}

	const exam = await prisma.exam.create({
		data: {
			type,
			examDate,
			toalMarks,
			courseOfferingId,
		},
		include: {
			courseOffering: {
				include: {
					course: true,
				},
			},
		},
	});

	return exam;
};

export const ExamService = {
	createExam,
};
