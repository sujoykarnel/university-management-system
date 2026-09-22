import { prisma } from "../../lib/prisma";

const getAllCourseOffering = async () => {
	const allCourseOffering = await prisma.courseOffering.findMany({
		where: {},
    include:{
      course: true,
      semester: true,
      instructor: {
        select:{
          name: true
        }
      }
    }
	});

	return allCourseOffering;
};

export const CourseOfferingService = {
	getAllCourseOffering,
};
