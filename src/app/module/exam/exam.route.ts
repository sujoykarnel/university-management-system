import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ExamController } from "./exam.controller";
import { ExamValidation } from "./exam.validation";

const router = Router();

router.post(
	"/",
	auth(Role.INSTRUCTOR),
	validateRequest(ExamValidation.ExamCreateZodSchema),
	ExamController.createExam,
);

export const ExamRoutes = router;
