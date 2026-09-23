import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TranscriptService } from "./transcript.service";

const createTranscript = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await TranscriptService.createTranscript(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Transcript Created successfully",
		data: result,
	});
});

export const TranscriptController = {
	createTranscript,
};
