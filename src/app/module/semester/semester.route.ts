import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { SemesterController } from "./semester.controller";

const router = Router();

router.get(
	"/",
	auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
	SemesterController.getAllSemester,
);

export const SemesterRoutes = router;
