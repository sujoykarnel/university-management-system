import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { ITranscriptCreatePayload } from "./transcript.interface";

const createTranscript = async (payload: ITranscriptCreatePayload) => {
	const { semesterId, studentId } = payload;

	// Check student
	const student = await prisma.student.findUnique({
		where: { id: studentId },
	});

	if (!student) {
		throw new AppError(httpStatus.NOT_FOUND, "Student Not Found");
	}

	// Check semester
	const semester = await prisma.semester.findUnique({
		where: { id: semesterId },
	});

	if (!semester) {
		throw new AppError(httpStatus.NOT_FOUND, "Semester Not Found");
	}

	// Check transcript already exists
	const isTranscriptExists = await prisma.transcript.findFirst({
		where: {
			semesterId,
			studentId,
		},
	});

	if (isTranscriptExists) {
		throw new AppError(httpStatus.BAD_REQUEST, "Transcript Already Generated");
	}

	// Get student's registered courses for this semester
	const courseRegistrations = await prisma.courseRegistration.findMany({
		where: {
			studentId,
			courseOffering: {
				semesterId,
			},
		},
		include: {
			courseOffering: {
				include: {
					course: true,
					exam: {
						include: {
							results: true,
						},
					},
				},
			},
		},
	});

	if (courseRegistrations.length === 0) {
		throw new AppError(httpStatus.BAD_REQUEST, "No Course Registration Found");
	}

	let totalCredit = 0;
	let earnedCredit = 0;
	let totalGradePoint = 0;

	for (const registration of courseRegistrations) {
		const course = registration.courseOffering.course;
		const result = registration.courseOffering.exam?.results[0];

		if (!course) continue;

		const credit = Number(course.credit);

		totalCredit += credit;

		if (!result) continue;

		/**
		 * Example:
		 * result.gradePoint = 3.50
		 * result.grade = "A-"
		 */

		const gradePoint = Number(result.gradePoint);

		// Failed course
		if (gradePoint >= 2.0) {
			earnedCredit += credit;
		}

		totalGradePoint += credit * gradePoint;
	}

	// GPA = Σ(Credit × Grade Point) / Σ Credit
	const gpa =
		totalCredit > 0 ? Number((totalGradePoint / totalCredit).toFixed(2)) : 0;

	/**
	 * CGPA should normally be calculated from
	 * previous semesters + current semester.
	 */
	const previousTranscripts = await prisma.transcript.findMany({
		where: {
			studentId,
			semesterId: {
				not: semesterId,
			},
		},
	});

	let cgpa = gpa;

	if (previousTranscripts.length > 0) {
		const previousCredit = previousTranscripts.reduce(
			(sum, transcript) => sum + Number(transcript.totalCredit),
			0,
		);

		const previousGradePoint = previousTranscripts.reduce(
			(sum, transcript) =>
				sum + Number(transcript.totalCredit) * Number(transcript.gpa),
			0,
		);

		cgpa =
			previousCredit + totalCredit > 0
				? Number(
						(
							(previousGradePoint + totalGradePoint) /
							(previousCredit + totalCredit)
						).toFixed(2),
					)
				: 0;
	}

	const transcript = await prisma.transcript.create({
		data: {
			studentId,
			semesterId,
			totalCredit,
			earnedCredit,
			gpa,
			cgpa,
		},
	});

	return transcript;
};

export const TranscriptService = {
	createTranscript,
};
