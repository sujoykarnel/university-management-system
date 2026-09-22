/*
  Warnings:

  - You are about to drop the `enrollments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_studentId_fkey";

-- DropTable
DROP TABLE "enrollments";

-- CreateTable
CREATE TABLE "courseRegistration" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseOfferingId" TEXT NOT NULL,

    CONSTRAINT "courseRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "paymentGetway" TEXT NOT NULL DEFAULT 'bkash',
    "merchantInvoiceNumber" TEXT NOT NULL,
    "bkashPaymentId" TEXT,
    "bkashTrxId" TEXT,
    "payerReference" TEXT,
    "paidAt" TEXT,
    "getwayResponse" JSONB,
    "refundTrxId" TEXT,
    "refundAmount" DECIMAL(10,2),
    "refundReason" TEXT,
    "refundedAt" TEXT,
    "courseRegistationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_registration_studentId_course" ON "courseRegistration"("studentId", "courseOfferingId");

-- CreateIndex
CREATE UNIQUE INDEX "courseRegistration_studentId_courseOfferingId_key" ON "courseRegistration"("studentId", "courseOfferingId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_merchantInvoiceNumber_key" ON "payments"("merchantInvoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "payments_bkashPaymentId_key" ON "payments"("bkashPaymentId");

-- AddForeignKey
ALTER TABLE "courseRegistration" ADD CONSTRAINT "courseRegistration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseRegistration" ADD CONSTRAINT "courseRegistration_courseOfferingId_fkey" FOREIGN KEY ("courseOfferingId") REFERENCES "couserOffierings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_courseRegistationId_fkey" FOREIGN KEY ("courseRegistationId") REFERENCES "courseRegistration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
