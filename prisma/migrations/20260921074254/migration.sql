/*
  Warnings:

  - A unique constraint covering the columns `[code,programId]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "courses_code_programId_key" ON "courses"("code", "programId");
