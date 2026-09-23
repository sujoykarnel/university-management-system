import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ResultController } from "./result.controller";
import { ResultValidation } from "./result.validation";

const router = Router();

router.post(
	"/",
	auth(Role.INSTRUCTOR),
	validateRequest(ResultValidation.ResultCreateZodSchema),
	ResultController.createResult,
);

export const ResultRoutes = router;
