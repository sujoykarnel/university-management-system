import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";

const router = Router();

router.post(
	"/register",
	validateRequest(UserValidation.StudentRegistrationZodSchema),
	AuthController.registerStudent,
);

router.post(
	"/verify-email",
	validateRequest(UserValidation.StudentEmailVerifyZodSchema),
	AuthController.verifyStudentEmail,
);

router.post("/login", AuthController.loginUser);

router.get(
	"/me",
	auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
	AuthController.getMe,
);

router.post('/refresh-token', AuthController.refreshToken)

router.post("/google", AuthController.googleLogin);

export const AuthRouters = router;
