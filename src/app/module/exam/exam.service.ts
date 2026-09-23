import { prisma } from "../../lib/prisma";
import type { IExamCreatePayload } from "./exam.interface";

const createExam = async (payload: IExamCreatePayload) => {
	const { type, examDate, toalMarks, courseOfferingId } = payload;

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

  return exam
};

export const ExamService = {
  createExam
}
