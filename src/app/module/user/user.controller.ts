import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { IRequestUser } from "./user.interface";
import { UserService } from "./user.service";

const getMe = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as unknown as IRequestUser;

	if (!user) {
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			"User information is missing in the request",
		);
	}

	const result = await UserService.getMe(user);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User profile fetched successfully",
		data: result,
	});
});

const updateProfileImage = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.userId;

	if (!req.file) {
		throw new Error("No File Provided.");
	}

	const result = await UserService.updateProfileImage(
		req.file?.buffer,
		userId!,
	);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Profile Image Update Successfully",
		data: result,
	});
});

export const UserController = {
	getMe,
	updateProfileImage,
};
