import { prisma } from "../../lib/prisma";
import type { IExamCreatePayload } from "./exam.interface";

const createExam = async (payload: IExamCreatePayload) => {
	const { type, examDate, toalMarks } = payload;

	const exam = await prisma.exam.create({
		data: {
			type,
			examDate,
			toalMarks,
      courseRegistrationId
		},
	});
};
