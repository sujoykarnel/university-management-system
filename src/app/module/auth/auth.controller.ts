import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const registerStudent = catchAsync(async (req: Request, res: Response) => {});
const verifyStudentEmail = catchAsync(async (req: Request, res: Response) => {});
const loginUser = catchAsync(async (req: Request, res: Response) => {});
const getMe = catchAsync(async (req: Request, res: Response) => {});
const refreshToken = catchAsync(async (req: Request, res: Response) => {});
const googleLogin = catchAsync(async (req: Request, res: Response) => {});
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
  resetPassword
};
