import z from "zod";

export const CourseRegistationValidationZodSchema = z.object({
	courseOfferingId: z.string(),
});

export const PayCourseRegistationValidationZodSchema = z.object({
	courseRegistrationId: z.string(),
});
