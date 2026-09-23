import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { CourseOfferingController } from "./courseOffering.controller";

const router = Router();

router.get(
	"/",
	auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
	CourseOfferingController.getAllCourseOffering,
);

router.patch(
	"/:id",
	auth(Role.ADMIN),
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	CourseOfferingController.updateCourseOffering,
);

export const CourseOfferingRoutes = router;
