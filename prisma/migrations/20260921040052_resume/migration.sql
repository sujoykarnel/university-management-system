-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "additionalFiles" JSONB,
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "resumePublicId" TEXT;
