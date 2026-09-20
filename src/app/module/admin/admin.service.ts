import { prisma } from "../../lib/prisma";
import type { IUniversityPayload } from "./admin.interface";

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
const createDepartment = async () => {};

export const AdminService = {
	createUniversity,
	createDepartment,
};
