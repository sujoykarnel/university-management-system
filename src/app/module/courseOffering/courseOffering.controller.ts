import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CourseOfferingService } from "./courseOffering.service";

const getAllCourseOffering = catchAsync(async (req: Request, res: Response) => {
	const result = await CourseOfferingService.getAllCourseOffering();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Course Offering fetched successfully",
		data: result,
	});
});

export const CourseOfferingController = {
	getAllCourseOffering,
};
