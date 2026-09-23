import z from "zod";

const AttendanceCreateZodSchema = z.object({
	courseRegistrationId: z.string().trim(),
	classDate: z.coerce.date("Start date must be a valid date"),
	status: z.string().trim(),
});

export const AttendanceValidation = {
	AttendanceCreateZodSchema,
};
