import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

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

const createDepartment = catchAsync(async (req: Request, res: Response) => {});

export const AdminController = {
	createUniversity,
	createDepartment,
};
