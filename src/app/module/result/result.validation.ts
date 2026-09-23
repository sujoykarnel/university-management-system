import z from "zod";

const ResultCreateZodSchema = z.object({
	examId: z.string().trim(),
	courseRegistrationId: z.string().trim(),
	grade: z.string().trim(),
	marks: z.number().min(0),
	gradePoint: z.number().min(0),
});

export const ResultValidation = {
	ResultCreateZodSchema,
};
