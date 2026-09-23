import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CourseOfferingService } from "./courseOffering.service";

const getAllCourseOffering = catchAsync(async (req: Request, res: Response) => {
	const { data, meta } = await CourseOfferingService.getAllCourseOffering(
		req.query,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Course Offering fetched successfully",
		data,
		meta,
	});
});

const updateCourseOffering = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const { id } = req.params;

	const result = await CourseOfferingService.updateCourseOffering(
		payload,
		id as string,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Course Offering Updated successfully",
		data: result,
	});
});

const deletedCourseOffering = catchAsync(
	async (req: Request, res: Response) => {
		const { id } = req.params;

		const result = await CourseOfferingService.deleteOfferingCourse(
			id as string,
		);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Course Offering Deleted successfully",
			data: result,
		});
	},
);

export const CourseOfferingController = {
	getAllCourseOffering,
	updateCourseOffering,
	deletedCourseOffering,
};
