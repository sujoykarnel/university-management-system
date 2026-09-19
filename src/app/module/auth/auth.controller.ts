import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerStudent = catchAsync(async (req: Request, res: Response) => {});
const verifyStudentEmail = catchAsync(
	async (req: Request, res: Response) => {},
);
const loginUser = catchAsync(async (req: Request, res: Response) => {});
const getMe = catchAsync(async (req: Request, res: Response) => {});
const refreshToken = catchAsync(async (req: Request, res: Response) => {});
const googleLogin = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await AuthService.googleLogin(payload);

	const { accessToken, refreshToken } = result;

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24, // 1 day
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User logged in successfully",
		data: {
			accessToken,
			refreshToken,
		},
	});
});
const forgotPassword = catchAsync(async (req: Request, res: Response) => {});
const resetPassword = catchAsync(async (req: Request, res: Response) => {});

export const AuthController = {
	googleLogin,
	registerStudent,
	verifyStudentEmail,
	loginUser,
	getMe,
	refreshToken,
	forgotPassword,
	resetPassword,
};
