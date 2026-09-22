-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'ONGOING', 'CMPOLETED');

-- AlterTable
ALTER TABLE "courseRegistration" ADD COLUMN     "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "AdmissionStatus";
