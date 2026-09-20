import app from "./app";
import config from "./app/config";
import { transporter } from "./app/lib/nodemailer";
import { prisma } from "./app/lib/prisma";
import { redisClient } from "./app/lib/radis";
import { seedSuperAdmin, seedTesterAdmin } from "./app/utils/seed";

const PORT = config.port;

async function main() {
	try {
		// database
		await prisma.$connect();
		console.log("Database Connected Successfully");

		// redis
		await redisClient.connect();
		console.log("Redis Connected Successfully");

		// mail transporter
    await transporter.verify()
    console.log("Nodemailer Connected Successfully");

		// init seeding
    await seedSuperAdmin()
    await seedTesterAdmin()

		// delete unverified

		app.listen(PORT, () => {
			console.log(`Server is Running on Port ${PORT}`);
		});
	} catch (error) {
		console.log(`Error Starting the Server:`, error);
		await prisma.$disconnect();
		process.exit(1);
	}
}

main();
