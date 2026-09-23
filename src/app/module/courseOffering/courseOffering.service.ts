import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ICourseOfferingUpdatePayload } from "./courseOffering.interface";

const getAllCourseOffering = async () => {
	const allCourseOffering = await prisma.courseOffering.findMany({
		where: {},
		include: {
			course: true,
			semester: true,
			instructor: {
				select: {
					name: true,
				},
			},
		},
	});

	return allCourseOffering;
};

const updateCourseOffering = async (
	payload: ICourseOfferingUpdatePayload,
	id: string,
) => {
	const existingCourse = await prisma.courseOffering.findUnique({
		where: { id },
	});

	if (!existingCourse) {
		throw new AppError(httpStatus.NOT_FOUND, "Course Not Exists");
	}

	const bookedSeat = existingCourse.totalSeat - existingCourse.availableSeat;

	const totalSeat = payload.totalSeat ?? existingCourse.totalSeat;

	const availableSeat = totalSeat - bookedSeat;

	if (availableSeat < 0) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"Total seat cannot be less than booked seat",
		);
	}

	const updatedCourse = await prisma.courseOffering.update({
		where: { id },
		data: {
			...payload,
			totalSeat,
			availableSeat,
		},
	});

	return updatedCourse;
};

export const CourseOfferingService = {
	getAllCourseOffering,
	updateCourseOffering,
};
