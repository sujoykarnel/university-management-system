/*
  Warnings:

  - Added the required column `courseFee` to the `couserOffierings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "couserOffierings" ADD COLUMN     "courseFee" INTEGER NOT NULL;
