import type { ExamType } from "../../../generated/prisma/enums";

export interface IExamCreatePayload {
	type: ExamType;
	toalMarks: number;
	examDate: string;
  courseOfferingId: string
}
