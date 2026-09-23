/*
  Warnings:

  - You are about to drop the column `programId` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_programId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "programId";
