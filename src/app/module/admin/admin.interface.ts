export interface IUniversityPayload {
	name: string;
	shortName: string;
}

export interface IDepartmentPayload {
	name: string;
	code: string;
}

export interface IProgramPayload {
	name: string;
	code: string;
	duration: number;
	totalCredits: number;
}

export type ICoursePayload = {
	title: string;
	code: string;
	credit: number;
	semesterNo: number;
};
