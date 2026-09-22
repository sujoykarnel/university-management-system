import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CourseRegistrationService } from "./courseRegistration.service";

const createCourseRegistration = catchAsync(
	async (req: Request, res: Response) => {
		const payload = req.body;
		const user = req.user!;

		const result = await CourseRegistrationService.createCourseRegistration(
			payload,
			user,
		);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Course Registration Successfully",
			data: result,
		});
	},
);

const payCourseRegistration = catchAsync(
	async (req: Request, res: Response) => {
		const payload = req.body;
		const user = req.user!;

		const result = CourseRegistrationService.payCourseRegistration(
			payload,
			user,
		);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Course Registration Payment Successfully",
			data: result,
		});
	},
);

const courseRegistrationCallback = catchAsync(
	async (req: Request, res: Response) => {
		const { redirectUrl } =
			await CourseRegistrationService.courseRegistrationCallback(req.query);

		res.redirect(redirectUrl);
	},
);

export const CourseRegistrationController = {
	createCourseRegistration,
	payCourseRegistration,
	courseRegistrationCallback,
};
