import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { CourseRegistrationController } from "./courseRegistration.controller";
import {
	CourseRegistationValidationZodSchema,
	PayCourseRegistationValidationZodSchema,
} from "./courseRegistration.validation";

const router = Router();

router.post(
	"/",
	auth(Role.STUDENT),
	validateRequest(CourseRegistationValidationZodSchema),
	CourseRegistrationController.createCourseRegistration,
);

router.post(
	"/payment",
	auth(Role.STUDENT),
	validateRequest(PayCourseRegistationValidationZodSchema),
	CourseRegistrationController.payCourseRegistration,
);

router.get(
	"/payment/callback",
	CourseRegistrationController.courseRegistrationCallback,
);

export const CourseRegistrationRoutes = router;
