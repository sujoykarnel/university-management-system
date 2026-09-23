/*
  Warnings:

  - A unique constraint covering the columns `[courseRegistrationId,classDate]` on the table `attendances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "attendances_courseRegistrationId_idx" ON "attendances"("courseRegistrationId");

-- CreateIndex
CREATE INDEX "attendances_classDate_idx" ON "attendances"("classDate");

-- CreateIndex
CREATE UNIQUE INDEX "attendances_courseRegistrationId_classDate_key" ON "attendances"("courseRegistrationId", "classDate");

-- CreateIndex
CREATE INDEX "exams_examDate_idx" ON "exams"("examDate");
