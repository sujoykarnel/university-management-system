import bcrypt from "bcryptjs";
import crypto from "crypto";
import ejs from "ejs";
import type { TokenPayload } from "google-auth-library";
import httpStatus from "http-status";
import type { SignOptions } from "jsonwebtoken";
import path from "path";
import {
	AuthProvider,
	Role,
	UserStatus,
} from "../../../generated/prisma/enums";
import config from "../../config";
import { googleClient } from "../../lib/googleAuth";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import { redisClient } from "../../lib/radis";
import { AppError } from "../../utils/AppError";
import { jwtUtils } from "../../utils/jwt";
import type {
	IGoogleLoginPayload,
	IRegisterStudentPayload,
	IVerifyEmailPayload,
} from "./auth.interface";

const registerStudent = async (payload: IRegisterStudentPayload) => {
	const { name, password, student: studentData } = payload;

	const email = payload.email.trim().toLowerCase();

	const isUserExisting = await prisma.user.findUnique({
		where: { email },
	});

	if (isUserExisting) {
		throw new AppError(
			httpStatus.CONFLICT,
			"User with this email already exists",
		);
	}

	const hashPassword = await bcrypt.hash(
		password,
		Number(config.bcrypt_salt_rounds),
	);

	const expirationSecoends = 5 * 60;

	const otpKey = `student-registration-otp:${email}`;
	const otpValue = crypto.randomInt(100000, 1000000).toString();

	await redisClient.set(otpKey, otpValue, {
		expiration: {
			type: "EX",
			value: expirationSecoends,
		},
	});

	const studentRegistrationKey = `student-registration-data:${email}`;
	const redisUserDataPayload = {
		name,
		email,
		password: hashPassword,
		stusent: studentData,
	};

	await redisClient.set(
		studentRegistrationKey,
		JSON.stringify(redisUserDataPayload),
		{
			expiration: {
				type: "EX",
				value: expirationSecoends,
			},
		},
	);

	const templatePath = path.join(
		process.cwd(),
		"src/app/templates/registration-user-otp.ejs",
	);

	const templateData = {
		name,
		email,
		otp: otpValue,
		expirationMinutes: expirationSecoends / 60,
	};

	const html = await ejs.renderFile(templatePath, templateData);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: email,
		subject: "Email Verification",
		html,
	});
};
const verifyStudentEmail = async (payload: IVerifyEmailPayload) => {
	const otp = payload.otp;
	const email = payload.email.trim().toLowerCase();

	const isUserExisting = await prisma.user.findUnique({
		where: { email },
	});

	if (isUserExisting?.status === UserStatus.BLOCKED) {
		throw new AppError(httpStatus.FORBIDDEN, "User is Blocked");
	}

	if (isUserExisting?.emailVerified) {
		throw new AppError(httpStatus.CONFLICT, "Email Already Veryfied");
	}

	if (
		isUserExisting?.isDeleted ||
		isUserExisting?.status === UserStatus.DELETED
	) {
		throw new AppError(httpStatus.NOT_FOUND, "User is Deleted");
	}

	const otpKey = `student-registration-otp:${email}`;
	const redisOtp = await redisClient.get(otpKey);

	if (!redisOtp) {
		throw new AppError(httpStatus.BAD_REQUEST, "Invalid OTP");
	}

	if (redisOtp !== otp) {
		throw new AppError(httpStatus.BAD_REQUEST, "OTP Does Not Match");
	}

	await redisClient.del(otpKey);

	const studentRegistrationKey = `student-registration-data:${email}`;
	const redisStudentData = await redisClient.get(studentRegistrationKey);

	if (!redisStudentData) {
		throw new AppError(httpStatus.NOT_FOUND, "Student Does not Exist");
	}

	const studentPayload: IRegisterStudentPayload = JSON.parse(redisStudentData);
	const createUser = await prisma.user.create({
		data: {
			name: studentPayload.name,
			email: studentPayload.email,
			password: studentPayload.password,
			role: Role.STUDENT,
			status: UserStatus.ACTIVE,
			emailVerified: true,
			student: {
				create: {
					name: studentPayload.name,
					email: studentPayload.email,
					contactNumber: studentPayload?.student?.contactNumber || "",
				},
			},
		},
		omit: { password: true },
		include: { student: true },
	});

	await redisClient.del(studentRegistrationKey);

	const templatePath = path.join(
		process.cwd(),
		"src/app/templates/student-welcome-email.ejs",
	);

	const templateData = {
		name: createUser.name,
	};

	const html = await ejs.renderFile(templatePath, templateData);

	await transporter.sendMail({
		from: config.smtp_sender,
		to: email,
		subject: "Welcome to University Management System",
		html,
	});

	const { student, ...user } = createUser;

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_access_expires_in as SignOptions,
	);
	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		user,
		student,
		accessToken,
		refreshToken,
	};
};
const loginUser = async () => {};
const getMe = async () => {};
const refreshToken = async () => {};

const googleLogin = async (payload: IGoogleLoginPayload) => {
	let googleIdTokenPayload: TokenPayload | null | undefined = null;
	try {
		const ticket = await googleClient.verifyIdToken({
			idToken: payload.idToken,
			audience: config.google_client_id,
		});

		googleIdTokenPayload = ticket.getPayload();
	} catch (error) {
		console.log("Google ID Token Verification Failed", error);
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"Invalid Or Expired Google ID Token",
		);
	}

	if (!googleIdTokenPayload) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"Invalid Or Expired Google ID Token",
		);
	}

	if (!googleIdTokenPayload.email) {
		throw new AppError(httpStatus.NOT_FOUND, "Google Email Not Found");
	}

	if (!googleIdTokenPayload.name) {
		throw new AppError(httpStatus.NOT_FOUND, "Google Name Not Found");
	}

	const isStudentExistWithGoogleAuth = await prisma.user.findUnique({
		where: {
			email: googleIdTokenPayload.email,
			role: Role.STUDENT,
			googleId: googleIdTokenPayload.sub,
		},
	});

	let user = isStudentExistWithGoogleAuth;

	if (!isStudentExistWithGoogleAuth) {
		const ifPatientExistWithCredentials = await prisma.user.findUnique({
			where: {
				email: googleIdTokenPayload.email,
				role: Role.STUDENT,
				authProvider: AuthProvider.CREDENTIAL,
			},
		});

		if (ifPatientExistWithCredentials) {
			if (!ifPatientExistWithCredentials.emailVerified) {
				throw new AppError(httpStatus.FORBIDDEN, "Email Not Verified");
			}
			if (ifPatientExistWithCredentials.status === UserStatus.BLOCKED) {
				throw new AppError(httpStatus.FORBIDDEN, "User Is Blocked");
			}

			if (
				ifPatientExistWithCredentials.isDeleted ||
				ifPatientExistWithCredentials.status === UserStatus.DELETED
			) {
				throw new AppError(httpStatus.NOT_FOUND, "User Is Deleted");
			}

			user = await prisma.user.update({
				where: {
					id: ifPatientExistWithCredentials.id,
				},
				data: {
					googleId: googleIdTokenPayload.sub,
				},
			});
		} else {
			user = await prisma.user.create({
				data: {
					name: googleIdTokenPayload.name,
					email: googleIdTokenPayload.email,
					role: Role.STUDENT,
					googleId: googleIdTokenPayload.sub,
					authProvider: AuthProvider.GOOGLE,
					emailVerified: true,
					student: {
						create: {
							name: googleIdTokenPayload.name,
							email: googleIdTokenPayload.email,
						},
					},
				},
			});

			const templatePath = path.join(
				process.cwd(),
				"src/app/templates/student-welcome-email.ejs",
			);

			const templateData = {
				name: user.name,
			};

			const html = await ejs.renderFile(templatePath, templateData);

			await transporter.sendMail({
				from: config.smtp_sender,
				to: user.email,
				subject: "Welcome to University Management System",
				html,
			});
		}
	}

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
	}

	if (user.status === UserStatus.BLOCKED) {
		throw new AppError(httpStatus.FORBIDDEN, "User Is Blocked");
	}

	if (user.isDeleted || user.status === UserStatus.DELETED) {
		throw new AppError(httpStatus.NOT_FOUND, "User Is Deleted");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

const forgotPassword = async () => {};
const resetPassword = async () => {};

export const AuthService = {
	googleLogin,
	registerStudent,
	verifyStudentEmail,
	loginUser,
	getMe,
	refreshToken,
	forgotPassword,
	resetPassword,
};
