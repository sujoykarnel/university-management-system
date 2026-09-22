import { prisma } from "../../lib/prisma";

const getAllSemester = async () => {
	const semesters = await prisma.semester.findMany({
		where: {},
		include: {
			courseOfferings: {
				include: {
					course: {
						include: {
							program: true,
						},
					},
				},
			},
		},
	});

	return semesters;
};

export const SemesterService = {
	getAllSemester,
};
