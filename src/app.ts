import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { AuthRouters } from "./app/module/auth/auth.route";

const app: Application = express();

app.use(
	cors({
		origin: config.frontend_url,
		credentials: true,
	}),
);

// enable url-enccode
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", AuthRouters);

app.get("/", async (req: Request, res: Response) => {
	res.send(httpStatus.OK).json({
		success: true,
		message: "Welcome University Management System Backend",
	});
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
