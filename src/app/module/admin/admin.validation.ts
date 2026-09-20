import z from "zod";

const UniversityCreateZodSchema = z.object({
	name: z.string().trim().min(2, "Name Is Required"),
	shortName: z.string().min(2).max(10),
});

const DepartmentCreateZodSchema = z.object({
	name: z.string().trim().min(2, "Name Is Required"),
	code: z.string().min(2).max(10),
});
const ProgramCreateZodSchema = z.object({
	name: z.string().trim().min(2, "Name Is Required"),
	code: z.string().min(2).max(10),
	duration: z.number().int().min(1).max(4, "Duration Is Required"),
	totalCredits: z.number().int().min(1).max(3, "Total Credit Is Required"),
});

export const AdminValidation = {
	UniversityCreateZodSchema,
	DepartmentCreateZodSchema,
	ProgramCreateZodSchema,
};
