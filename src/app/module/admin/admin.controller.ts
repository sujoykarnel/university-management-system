import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import { AdminValidation } from "./admin.validation";

const createUniversity = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await AdminService.createUniversity(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "University Created successfully",
		data: result,
	});
});

const createDepartment = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await AdminService.createDepartment(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Department Created successfully",
		data: result,
	});
});

const createProgram = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await AdminService.createProgram(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Program Created successfully",
		data: result,
	});
});

const createInstructor = catchAsync(async (req: Request, res: Response) => {
	const files = req.files as { [fieldname: string]: Express.Multer.File[] };
	const resume = files?.["resume"] ? files["resume"][0] : null;
	const additionalFiles = files?.["additionalFiles"] || [];

	const zodValidationResult =
		AdminValidation.InstructorCreateZodSchema.safeParse(
			JSON.parse(req.body.data),
		);

	if (!zodValidationResult.success) {
		throw new Error(zodValidationResult.error.issues[0].message);
	}

	const payload = zodValidationResult.data;

	const result = await AdminService.createInstructor(
		payload,
		resume,
		additionalFiles,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Instructor Created successfully",
		data: result,
	});
});

const createCourse = catchAsync(async (req: Request, res: Response) => {});

export const AdminController = {
	createUniversity,
	createDepartment,
	createProgram,
	createInstructor,
	createCourse,
};
