import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";

const PORT = config.port;

async function main() {
	try {
    // database
		await prisma.$connect();
		console.log("Database Connected Successfully");

    // redis


    // mail transporter

    // init seeding


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
