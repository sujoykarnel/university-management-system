/*
  Warnings:

  - A unique constraint covering the columns `[code,universityId]` on the table `departments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "departments_code_key";

-- DropIndex
DROP INDEX "departments_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_universityId_key" ON "departments"("code", "universityId");
