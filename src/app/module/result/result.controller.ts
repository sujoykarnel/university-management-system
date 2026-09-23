import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ResultService } from "./result.service";

const createResult = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await ResultService.createResult(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Attendance Created successfully",
		data: result,
	});
});

export const ResultController = {
	createResult,
};
