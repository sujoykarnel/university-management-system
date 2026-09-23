import z from "zod";

const ExamCreateZodSchema = z.object({
	type: z.string().trim(),
	toalMarks: z.string().trim(),
	examDate: z.coerce.date("Start date must be a valid date"),
});

export const ExamValidation = {
	ExamCreateZodSchema,
};
