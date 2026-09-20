import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
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

export const AdminRoutes = router;
