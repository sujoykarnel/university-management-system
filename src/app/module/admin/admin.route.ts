import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.post(
	"/university",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	validateRequest(AdminValidation.UniversityCreateZodSchema),
	AdminController.createUniversity,
);

router.post(
	"/department",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	validateRequest(AdminValidation.DepartmentCreateZodSchema),
	AdminController.createDepartment,
);

router.post(
	"/program",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	validateRequest(AdminValidation.ProgramCreateZodSchema),
	AdminController.createProgram,
);

router.post(
	"/instructor",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	upload.fields([
		{
			name: "resume",
			maxCount: 1,
		},
		{
			name: "additionalFiles",
			maxCount: 10,
		},
	]),
	AdminController.createInstructor,
);

router.post(
	"/course",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	validateRequest(AdminValidation.CourseCreateZodSchema),
	AdminController.createCourse,
);

export const AdminRoutes = router;
