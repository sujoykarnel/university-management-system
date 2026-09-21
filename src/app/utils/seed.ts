import bcrypt from "bcryptjs";
import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";

export const seedSuperAdmin = async () => {
	try {
		const isSuperAdmin = await prisma.user.findFirst({
			where: {
				role: Role.SUPER_ADMIN,
			},
		});

		if (isSuperAdmin) {
			console.log("Super Admin Already Exists!");
			return;
		}

		const name = config.super_admin_name;
		const email = config.super_admin_email;
		const password = config.super_admin_password;

		if (!name || !email || !password) {
			throw new Error(
				"Super Admin Name, Email & Password Missing In Env File!!!",
			);
		}

		const hashedPassword = await bcrypt.hash(
			password,
			Number(config.bcrypt_salt_rounds),
		);

		const superAdmin = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: Role.SUPER_ADMIN,
				needPasswordChange: false,
				emailVerified: true,
			},
		});

		console.log("Super Admin Created : ", superAdmin);
	} catch (error) {
		console.log("Error Seeding Super Admin: ", error);
		await prisma.user.delete({
			where: {
				email: config.super_admin_email,
			},
		});
	}
};

export const seedTesterAdmin = async () => {
	try {
		const isTesterAdmin = await prisma.user.findUnique({
			where: {
				email: config.tester_admin_email,
			},
		});

		if (isTesterAdmin) {
			console.log("Tester Admin Already Exists!");
			return;
		}

		const name = config.tester_admin_name;
		const email = config.tester_admin_email;
		const password = config.tester_admin_password;

		if (!name || !email || !password) {
			throw new Error(
				"Tester Admin Name, Email & Password Missing In Env File!!!",
			);
		}

		const hashedPassword = await bcrypt.hash(
			password,
			Number(config.bcrypt_salt_rounds),
		);

		const testerAdmin = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: Role.ADMIN,
				needPasswordChange: false,
				emailVerified: true,
			},
		});

		console.log("Teater Admin Created : ", testerAdmin);
	} catch (error) {
		console.log("Error Seeding Teater Admin: ", error);
		await prisma.user.delete({
			where: {
				email: config.tester_admin_email,
			},
		});
	}
};

// export const seedTesterInstructor = async () => {
// 	try {
// 		const isTesterDoctor = await prisma.user.findUnique({
// 			where: {
// 				email: config.tester_doctor_email,
// 			},
// 		});

// 		if (isTesterDoctor) {
// 			console.log("Tester Doctor Already Exists!");
// 			return;
// 		}

// 		const name = config.tester_doctor_name;
// 		const email = config.tester_doctor_email;
// 		const password = config.tester_doctor_password;

// 		if (!name || !email || !password) {
// 			throw new Error(
// 				"Tester Instructor Name, Email & Password Missing In Env File!!!",
// 			);
// 		}

// 		const hashedPassword = await bcrypt.hash(
// 			password,
// 			Number(config.bcrypt_salt_rounds),
// 		);

// 		const testerInstructor = await prisma.user.create({
// 			data: {
// 				name,
// 				email,
// 				password: hashedPassword,
// 				role: Role.INSTRUCTOR,
// 				needPasswordChange: false,
// 				emailVerified: true,
// 				instuctor: {
// 					create: {
// 						email,
// 						name,
//             de

// 					},
// 				},
// 			},
// 		});

// 		console.log("Teater Admin Created : ", testerInstructor);
// 	} catch (error) {
// 		console.log("Error Seeding Teater Admin: ", error);
// 		await prisma.user.delete({
// 			where: {
// 				email: config.tester_admin_email,
// 			},
// 		});
// 	}
// };
