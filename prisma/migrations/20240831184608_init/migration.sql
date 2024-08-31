/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `GPOAccount` will be added. If there are existing duplicate values, this will fail.
  - Made the column `maxCapacity` on table `ParkingSpace` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GPO', 'VISITOR');

-- DropForeignKey
ALTER TABLE "GPOAccount" DROP CONSTRAINT "GPOAccount_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "GPOSession" DROP CONSTRAINT "GPOSession_accountId_fkey";

-- DropForeignKey
ALTER TABLE "GPOViolation" DROP CONSTRAINT "GPOViolation_accountViolatorId_fkey";

-- AlterTable
ALTER TABLE "GPOAccount" ADD COLUMN     "email" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'GPO',
ALTER COLUMN "collegeId" DROP NOT NULL,
ALTER COLUMN "creditScore" DROP NOT NULL,
ALTER COLUMN "creditScore" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "GPOSession" ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ONGOING',
ALTER COLUMN "endedProperly" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ParkingSpace" ALTER COLUMN "maxCapacity" SET NOT NULL;

-- AlterTable
ALTER TABLE "VisitorAccount" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'VISITOR';

-- CreateIndex
CREATE UNIQUE INDEX "GPOAccount_email_key" ON "GPOAccount"("email");

-- AddForeignKey
ALTER TABLE "GPOAccount" ADD CONSTRAINT "GPOAccount_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPOSession" ADD CONSTRAINT "GPOSession_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "GPOAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPOViolation" ADD CONSTRAINT "GPOViolation_accountViolatorId_fkey" FOREIGN KEY ("accountViolatorId") REFERENCES "GPOAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
