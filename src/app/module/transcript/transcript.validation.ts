import z from "zod";

const TranscriptCreateZodSchema = z.object({
	studentId: z.string().trim(),
	semesterId: z.string().trim(),
});

export const TranscriptValidation = {
	TranscriptCreateZodSchema,
};
