/*
  Warnings:

  - You are about to drop the column `courseId` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `semesterId` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the `CourseOffering` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_courseId_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_semesterId_fkey";

-- DropIndex
DROP INDEX "enrollments_courseId_studentId_key";

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "courseId",
DROP COLUMN "semesterId";

-- DropTable
DROP TABLE "CourseOffering";

-- CreateTable
CREATE TABLE "couserOffierings" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "totalSeat" INTEGER NOT NULL,
    "availableSeat" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "deleteAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "couserOffierings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "couserOffierings_semesterId_idx" ON "couserOffierings"("semesterId");

-- CreateIndex
CREATE INDEX "couserOffierings_instructorId_idx" ON "couserOffierings"("instructorId");

-- CreateIndex
CREATE INDEX "couserOffierings_courseId_idx" ON "couserOffierings"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "couserOffierings_courseId_semesterId_key" ON "couserOffierings"("courseId", "semesterId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_studentId_key" ON "enrollments"("studentId");

-- AddForeignKey
ALTER TABLE "couserOffierings" ADD CONSTRAINT "couserOffierings_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couserOffierings" ADD CONSTRAINT "couserOffierings_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couserOffierings" ADD CONSTRAINT "couserOffierings_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
