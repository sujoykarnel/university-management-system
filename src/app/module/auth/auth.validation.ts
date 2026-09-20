import z from "zod";

const StudentRegistrationZodSchema = z.object({
	name: z.string("Not a string....").min(3).max(10),
	email: z.email("Not Email...."),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(32, "Password cannot exceed 32 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(
			/[^A-Za-z0-9]/,
			"Password must contain at least one special character",
		),
	student: z
		.object({ address: z.string().optional(),  })
		.optional(),
});

const StudentEmailVerifyZodSchema = z.object({
	email: z.email("Not Email...."),
	otp: z.string().length(6),
});

const ForgotPassowedZodShema = z.object({
	email: z.email("Not Email...."),
});

const ResetPassowedZodShema = z.object({
	email: z.email("Not Email...."),
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(32, "Password cannot exceed 32 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(
			/[^A-Za-z0-9]/,
			"Password must contain at least one special character",
		),
	otp: z.string().length(6),
});

export const UserValidation = {
	StudentRegistrationZodSchema,
	StudentEmailVerifyZodSchema,
	ForgotPassowedZodShema,
	ResetPassowedZodShema,
};
