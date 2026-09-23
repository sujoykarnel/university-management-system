import type { AttendanceStatus } from "../../../generated/prisma/enums";

export interface IAttendanceCreatePaylaod {
	courseRegistrationId: string;
	classDate: string;
	status: AttendanceStatus;
}
