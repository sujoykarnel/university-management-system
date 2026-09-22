export interface IUniversityCreatePayload {
	name: string;
	shortName: string;
}

export interface IDepartmentCreatePayload {
	name: string;
	code: string;
	universityId: string;
}

export interface IProgramCreatePayload {
	name: string;
	code: string;
	duration: number;
	totalCredits: number;
	departmentId: string;
}

export type ICourseCreatePayload = {
	title: string;
	code: string;
	credit: number;
	semesterNo: number;
	programId: string;
};

export type IInstructorCreatePayload = {
	user: {
		name: string;
		email: string;
		password: string;
	};
	instructor: {
		address?: string;
		departmentId: string;
	};
};

export type ISemesterCreatePayload = {
	name: string;
	year: number;
	startDate: string;
	endDate: string;
};

export type ICourseOfferingCreatePayload = {
  courseId: string;
	semesterId: string;
	instructorId: string;
	courseFee: number;
  totalSeat: number
};
