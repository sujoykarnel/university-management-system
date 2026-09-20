import type { UploadApiResponse } from "cloudinary";
import httpStatus from "http-status";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { IRequestUser } from "./user.interface";

const getMe = async (user: IRequestUser) => {
	const isUserExisting = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		omit: {
			password: true,
		},
	});

	if (!isUserExisting) {
		throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
	}
	return isUserExisting;
};

const updateProfileImage = async (buffer: Buffer, userId: string) => {
	const currentUser = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			imagePublicId: true,
			imageUrl: true,
		},
	});

	const cloudinaryResult = await new Promise<UploadApiResponse>(
		(resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ resource_type: "auto" }, async (error, result) => {
					if (error) {
						return reject(error);
					}

					if (!result) {
						return reject(
							new AppError(
								httpStatus.BAD_GATEWAY,
								"No Result Return From Cloudinary",
							),
						);
					}

					resolve(result);
				})
				.end(buffer);
		},
	);

	const updateUser = await prisma.user.update({
		where: { id: userId },
		data: {
			imageUrl: cloudinaryResult?.secure_url,
			imagePublicId: cloudinaryResult?.public_id,
		},
		omit: { password: true },
	});

	if (currentUser?.imagePublicId && currentUser.imageUrl) {
		await cloudinary.uploader.destroy(currentUser.imagePublicId);
	}
	return updateUser;
};

export const UserService = {
	getMe,
	updateProfileImage,
};
