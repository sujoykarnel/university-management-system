/*
  Warnings:

  - You are about to drop the column `courseRegistrationId` on the `exams` table. All the data in the column will be lost.
  - Added the required column `courseOfferingId` to the `exams` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exams" DROP CONSTRAINT "exams_courseRegistrationId_fkey";

-- DropIndex
DROP INDEX "idx_registrationId";

-- AlterTable
ALTER TABLE "exams" DROP COLUMN "courseRegistrationId",
ADD COLUMN     "courseOfferingId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "idx_courseOfferingId" ON "exams"("courseOfferingId");

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_courseOfferingId_fkey" FOREIGN KEY ("courseOfferingId") REFERENCES "couserOffierings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
