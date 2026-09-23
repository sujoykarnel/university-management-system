import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AttendanceService } from "./attendance.service";

const createAttendance = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await AttendanceService.createAttendance(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Attendance Created successfully",
		data: result,
	});
});

export const AttendanceController = {
	createAttendance,
};
