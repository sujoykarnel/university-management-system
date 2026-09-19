import { Router } from "express";
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

router.post("/google", AuthController.googleLogin);

export const AuthRouters = router;
