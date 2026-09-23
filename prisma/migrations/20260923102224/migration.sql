-- CreateTable
CREATE TABLE "transcripts" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "totalCredit" DOUBLE PRECISION NOT NULL,
    "earnedCredit" DOUBLE PRECISION NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transcripts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "transcripts_studentId_idx" ON "transcripts"("studentId");

-- CreateIndex
CREATE INDEX "transcripts_semesterId_idx" ON "transcripts"("semesterId");

-- CreateIndex
CREATE UNIQUE INDEX "transcripts_studentId_semesterId_key" ON "transcripts"("studentId", "semesterId");

-- AddForeignKey
ALTER TABLE "transcripts" ADD CONSTRAINT "transcripts_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transcripts" ADD CONSTRAINT "transcripts_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
