/*
  Warnings:

  - A unique constraint covering the columns `[courseOfferingId]` on the table `exams` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "exams_courseOfferingId_key" ON "exams"("courseOfferingId");
