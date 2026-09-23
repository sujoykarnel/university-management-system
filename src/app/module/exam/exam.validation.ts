import z from "zod";

const ExamCreateZodSchema = z.object({
	courseOfferingId: z.string().trim(),
	type: z.string().trim(),
	toalMarks: z.number().min(1),
	examDate: z.coerce.date("Start date must be a valid date"),
});

export const ExamValidation = {
	ExamCreateZodSchema,
};
