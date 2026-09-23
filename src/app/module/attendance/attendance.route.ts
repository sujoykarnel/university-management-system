import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AttendanceController } from "./attendance.controller";
import { AttendanceValidation } from "./attendance.validation";

const router = Router();

router.post(
	"/",
	auth(Role.INSTRUCTOR, Role.ADMIN),
	validateRequest(AttendanceValidation.AttendanceCreateZodSchema),
	AttendanceController.createAttendance,
);

export const AttendanceRoutes = router;
