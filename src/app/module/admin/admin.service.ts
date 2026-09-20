import { prisma } from "../../lib/prisma";
import type { IDepartmentPayload, IUniversityPayload } from "./admin.interface";

const createUniversity = async (payload: IUniversityPayload) => {
	const { name, shortName } = payload;

	const university = await prisma.university.create({
		data: {
			name,
			shortName,
		},
	});

	return university;
};

const createDepartment = async (payload: IDepartmentPayload) => {
	const { name, code, universityId } = payload;

	const department = await prisma.department.create({
		data: {
			name,
			code,
			universityId,
		},
		include: {
			university: true,
		},
	});

	return department;
};

const createProgram = async () => {};

const createCourse = async () => {};

export const AdminService = {
	createUniversity,
	createDepartment,
	createProgram,
	createCourse,
};
