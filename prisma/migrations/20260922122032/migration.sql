/*
  Warnings:

  - A unique constraint covering the columns `[courseRegistationId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payments_courseRegistationId_key" ON "payments"("courseRegistationId");
