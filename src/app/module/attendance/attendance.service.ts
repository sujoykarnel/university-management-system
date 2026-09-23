import { prisma } from "../../lib/prisma";
import type { IAttendanceCreatePaylaod } from "./attendance.interface";

const createAttendance = async (payload: IAttendanceCreatePaylaod) => {
	const { courseRegistrationId, classDate, status } = payload;

	const attendance = prisma.attendance.create({
		data: {
			courseRegistrationId,
			classDate,
			status,
		},
		include: {
			courseRegistration: {
				include: {
					student: true,
				},
			},
		},
	});

	return attendance;
};

export const AttendanceService = {
	createAttendance,
};
