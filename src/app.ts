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
import { AdminRoutes } from "./app/module/admin/admin.route";
import { AttendanceRoutes } from "./app/module/attendance/attendance.route";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { CourseOfferingRoutes } from "./app/module/courseOffering/courseOffering.route";
import { CourseRegistrationRoutes } from "./app/module/courseRegistration/courseRegistration.route";
import { ExamRoutes } from "./app/module/exam/exam.route";
import { SemesterRoutes } from "./app/module/semester/semester.route";
import { UserRoutes } from "./app/module/user/user.route";

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
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/course-offering", CourseOfferingRoutes);
app.use("/api/v1/semester", SemesterRoutes);
app.use("/api/v1/course-registration", CourseRegistrationRoutes);
app.use("/api/v1/attendance", AttendanceRoutes);
app.use("/api/v1/exam", ExamRoutes);

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
