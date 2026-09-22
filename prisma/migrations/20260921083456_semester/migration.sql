/*
  Warnings:

  - You are about to drop the column `title` on the `semesters` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `semesters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `semesters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `semesters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `semesters` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SemesterStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'COMPLETED', 'CLOSED');

-- AlterTable
ALTER TABLE "semesters" DROP COLUMN "title",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "SemesterStatus" NOT NULL DEFAULT 'UPCOMING',
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CourseOffering" (
    "id" TEXT NOT NULL,

    CONSTRAINT "CourseOffering_pkey" PRIMARY KEY ("id")
);
