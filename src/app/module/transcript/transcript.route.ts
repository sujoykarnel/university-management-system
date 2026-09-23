import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { TranscriptController } from "./transcript.controller";
import { TranscriptValidation } from "./transcript.validation";

const router = Router();

router.post(
	"/",
	auth(Role.INSTRUCTOR),
	validateRequest(TranscriptValidation.TranscriptCreateZodSchema),
	TranscriptController.createTranscript,
);

export const TranscriptRoutes = router;
