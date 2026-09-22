import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SemesterService } from "./semester.service";

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
	const result = await SemesterService.getAllSemester();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Semesters fetched successfully",
		data: result,
	});
});

export const SemesterController = {
	getAllSemester,
};
