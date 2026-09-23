import { prisma } from "../../lib/prisma";
import type { IResultCreatePayload } from "./result.interface";

const createResult = async (payload: IResultCreatePayload) => {
	const { examId, courseRegistrationId, grade, gradePoint, marks } = payload;

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
