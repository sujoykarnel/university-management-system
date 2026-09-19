import ejs from "ejs";
import type { TokenPayload } from "google-auth-library";
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
import { jwtUtils } from "../../utils/jwt";
import type { IGoogleLoginPayload } from "./auth.interface";

const registerStudent = async () => {};
const verifyStudentEmail = async () => {};
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
		throw new Error("Invalid Or Expired Google ID Token");
	}

	if (!googleIdTokenPayload) {
		throw new Error("Invalid Or Expired Google ID Token");
	}

	if (!googleIdTokenPayload.email) {
		throw new Error("Google Email Not Found");
	}

	if (!googleIdTokenPayload.name) {
		throw new Error("Google Name Not Found");
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
				throw new Error("Email Not Verified");
			}
			if (ifPatientExistWithCredentials.status === UserStatus.BLOCKED) {
				throw new Error("User Is Blocked");
			}

			if (
				ifPatientExistWithCredentials.isDeleted ||
				ifPatientExistWithCredentials.status === UserStatus.DELETED
			) {
				throw new Error("User Is Deleted");
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
		throw new Error("User Not Found");
	}

	if (user.status === UserStatus.BLOCKED) {
		throw new Error("User Is Blocked");
	}

	if (user.isDeleted || user.status === UserStatus.DELETED) {
		throw new Error("User Is Deleted");
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
