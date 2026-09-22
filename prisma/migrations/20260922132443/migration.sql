/*
  Warnings:

  - The values [ONGOING,CMPOLETED] on the enum `RegistrationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `getwayResponse` on the `payments` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RegistrationStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');
ALTER TABLE "public"."courseRegistration" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "courseRegistration" ALTER COLUMN "status" TYPE "RegistrationStatus_new" USING ("status"::text::"RegistrationStatus_new");
ALTER TYPE "RegistrationStatus" RENAME TO "RegistrationStatus_old";
ALTER TYPE "RegistrationStatus_new" RENAME TO "RegistrationStatus";
DROP TYPE "public"."RegistrationStatus_old";
ALTER TABLE "courseRegistration" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "getwayResponse",
ADD COLUMN     "gatewayResponse" JSONB;
