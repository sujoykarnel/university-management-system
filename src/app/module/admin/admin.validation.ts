import z from "zod";

const UniversityCreateZodSchema = z.object({
	name: z.string().trim().min(2),
	shortName: z.string().min(2).max(10),
});

const DepartmentCreateZodSchema = z.object({
	name: z.string().trim().min(2),
	code: z.string().min(2).max(10),
	universityId: z.string(),
});

const ProgramCreateZodSchema = z.object({
	name: z.string().trim().min(2),
	code: z.string().min(2).max(10),
	duration: z.number().int().min(1).max(4, "Duration Maximum 4 Years"),
	totalCredits: z.number().int().min(1).max(160),
	departmentId: z.string("Not a string..."),
});

const InstructorCreateZodSchema = z.object({
	user: z.object({
		name: z.string().trim().min(2, "Name must be at least 2 characters long"),
		email: z.email("Invalid email address").trim().toLowerCase(),
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
	}),

	instructor: z.object({
		address: z
			.string()
			.trim()
			.min(5, "Address must be at least 5 characters long")
			.optional(),

		departmentId: z.string().trim().min(2),
	}),
});

const CourseCreateZodSchema = z.object({
	title: z.string().trim().min(2),
	code: z.string().min(2).max(10),
	credit: z.number("Not a Number...").int().min(1).max(3),
	semesterNo: z.number("Not a Number...").int().min(1).max(12),
	programId: z.string(),
});

const SemesterCreateZodSchema = z.object({
	name: z.string().trim().min(2),
	year: z.coerce.number("Year must be a number").int("Year must be an integer"),
	startDate: z.coerce.date("Start date must be a valid date"),
	endDate: z.coerce.date("End date must be a valid date"),
});

const CourseOfferingCreateZodSchema = z.object({
	courseId: z.string().trim(),
	semesterId: z.string().trim(),
	instructorId: z.string().trim(),
	courseFee: z.number("Not a Number...").int().min(1),
	totalSeat: z.number("Not a Number...").int().min(1),
});

export const AdminValidation = {
	UniversityCreateZodSchema,
	DepartmentCreateZodSchema,
	ProgramCreateZodSchema,
	InstructorCreateZodSchema,
	CourseCreateZodSchema,
	SemesterCreateZodSchema,
	CourseOfferingCreateZodSchema,
};
