import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { upload } from "../../lib/multer";
import { auth } from "../../middleware/checkAuth";
import { UserController } from "./user.controller";

const router = Router();

router.get(
	"/me",
	auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
	UserController.getMe,
);

router.patch(
	"/profile-image",
	auth(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT, Role.SUPER_ADMIN),
	upload.single("profileImage"),
	UserController.updateProfileImage,
);

export const UserRoutes = router;
