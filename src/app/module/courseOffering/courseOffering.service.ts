import httpStatus from "http-status";
import type { CourseOfferingWhereInput } from "../../../generated/prisma/models";
import type { IQuery } from "../../interfaces";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ICourseOfferingUpdatePayload } from "./courseOffering.interface";

const getAllCourseOffering = async (query: IQuery) => {
	const limit = query.limit ? Number(query.limit) : 10;
	const page = query.page ? Number(query.page) : 1;
	const skip = (page - 1) * limit;
	const sortBy = query.sortBy ? query.sortBy : "createdAt";
	const sortOrder = query.sortOrder ? query.sortOrder : "desc";

	const andConditions: CourseOfferingWhereInput[] = [];

	if (query.courseId) {
		andConditions.push({ courseId: query.courseId });
	}

	if (query.semesterId) {
		andConditions.push({ semesterId: query.semesterId });
	}

	if (query.instructorId) {
		andConditions.push({ instructorId: query.instructorId });
	}

	if (query.searchTerm) {
		andConditions.push({
			OR: [
				{
					instructor: {
						OR: [
							{ name: { contains: query.searchTerm, mode: "insensitive" } },
							{ email: { contains: query.searchTerm, mode: "insensitive" } },
						],
					},
				},
				{
					course: {
						OR: [
							{ title: { contains: query.searchTerm, mode: "insensitive" } },
							{ code: { contains: query.searchTerm, mode: "insensitive" } },
						],
					},
				},
				{
					semester: {
						OR: [{ name: { contains: query.searchTerm, mode: "insensitive" } }],
					},
				},
			],
		});
	}

	const allCourseOffering = await prisma.courseOffering.findMany({
		where: { AND: andConditions },
		take: limit,
		skip,
		orderBy: {
			[sortBy]: sortOrder,
		},
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

	const total = await prisma.courseOffering.count({
		where: { AND: andConditions },
	});

	return {
		data: allCourseOffering,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
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

const deleteOfferingCourse = async (id: string) => {
	const existingCourse = await prisma.courseOffering.findUnique({
		where: { id },
	});

	if (!existingCourse) {
		throw new AppError(httpStatus.NOT_FOUND, "Course Not Exists");
	}

	if (existingCourse.availableSeat < existingCourse.totalSeat) {
		throw new AppError(
			httpStatus.BAD_REQUEST,
			"Cannot delete course. Becouse course has been registed student",
		);
	}

	const deletedCourse = await prisma.courseOffering.delete({
		where: { id },
	});

	return deletedCourse;
};

export const CourseOfferingService = {
	getAllCourseOffering,
	updateCourseOffering,
	deleteOfferingCourse,
};
