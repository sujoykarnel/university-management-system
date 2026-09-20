export interface ILoginUserPayload {
	email: string;
	password: string;
}

export interface IRegisterStudentPayload {
	name: string;
	email: string;
	password: string;
	student: {
		contactNumber?: string;
	};
}

export interface IVerifyEmailPayload {
	email: string;
	otp: string;
}

export interface IGoogleLoginPayload {
	idToken: string;
}

export interface IForgotPasswordPayload {
	email: string;
}

export interface IResetPasswordPayload {
	email: string;
	newPassword: string;
	otp: string;
}
