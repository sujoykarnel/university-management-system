export interface IUniversityPayload {
	name: string;
	shortName: string;
}

export interface IDepartmentPayload {
	name: string;
	code: string;
	universityId: string;
}

export interface IProgramPayload {
	name: string;
	code: string;
	duration: number;
	totalCredits: number;
	departmentId: string;
}

export type ICoursePayload = {
	title: string;
	code: string;
	credit: number;
	semesterNo: number;
};
export type IInstructorCreatePayload = {
	user:{
    name: string
    email: string
    password: string
  },
  instructor:{
    address?: string
    departmentId: string
  }
};
