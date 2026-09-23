import z from "zod";

const CourseOfferingUpdateZodSchema = z.object({
	courseId: z.string().trim().optional(),
	semesterId: z.string().trim().optional(),
	instructorId: z.string().trim().optional(),
	courseFee: z.number("Not a Number...").int().min(1).optional(),
	totalSeat: z.number("Not a Number...").int().min(1).optional(),
});

export const CourseOfferingValidation = {
	CourseOfferingUpdateZodSchema,
};
