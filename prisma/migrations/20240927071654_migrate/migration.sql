-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GPO', 'VISITOR');

-- CreateEnum
CREATE TYPE "AduitAction" AS ENUM ('CREATE', 'INSERT', 'UPDATE', 'DELETE', 'REACTIVATE', 'DEACTIVATE');

-- CreateEnum
CREATE TYPE "AuditTable" AS ENUM ('ADMIN', 'ACCOUNT', 'VISITORACCOUNT', 'PARKINGSPACE', 'COLLEGE');

-- CreateEnum
CREATE TYPE "ParkingSpaceType" AS ENUM ('MOTORCYCLE', 'TRICYCLE', 'FOURWHEEL', 'HYBRID', 'PWD', 'VIP');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('FACULTY', 'STUDENT', 'STAFF');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('ONGOING', 'ENDED');

-- CreateTable
CREATE TABLE "GPOAccount" (
    "id" TEXT NOT NULL,
    "gatePassNumber" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "collegeId" INTEGER,
    "department" TEXT,
    "isVIP" BOOLEAN NOT NULL DEFAULT false,
    "isPWD" BOOLEAN NOT NULL DEFAULT false,
    "imageLink" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'GPO',
    "creditScore" INTEGER DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GPOAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPOSession" (
    "id" TEXT NOT NULL,
    "parkingSpaceId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shouldEndAt" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "status" "SessionStatus" NOT NULL DEFAULT 'ONGOING',
    "endedProperly" BOOLEAN,

    CONSTRAINT "GPOSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPOViolation" (
    "id" TEXT NOT NULL,
    "accountViolatorId" TEXT NOT NULL,
    "violationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "violationType" TEXT NOT NULL,
    "pointsDeducted" INTEGER NOT NULL,

    CONSTRAINT "GPOViolation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gatePassNumber" TEXT,
    "password" TEXT NOT NULL,
    "isPWD" BOOLEAN NOT NULL DEFAULT false,
    "imageLink" TEXT,
    "creditScore" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'VISITOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitorAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorSession" (
    "id" TEXT NOT NULL,
    "parkingSpaceId" TEXT NOT NULL,
    "visitorAccountId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "SessionStatus" NOT NULL,
    "endedProperly" BOOLEAN NOT NULL,

    CONSTRAINT "VisitorSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorViolation" (
    "id" TEXT NOT NULL,
    "accountViolatorId" TEXT NOT NULL,
    "violationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "violationType" TEXT NOT NULL,
    "pointsDeducted" INTEGER NOT NULL,

    CONSTRAINT "VisitorViolation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSpace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "spaceType" "ParkingSpaceType" NOT NULL DEFAULT 'HYBRID',
    "currCapacity" INTEGER DEFAULT 0,
    "maxCapacity" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ParkingSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "corpEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" "AduitAction" NOT NULL,
    "table" "AuditTable" NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportGenerationLog" (
    "id" TEXT NOT NULL,
    "generatedByAdminId" TEXT NOT NULL,
    "reportDescription" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportGenerationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "collegeName" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GPOAccount_gatePassNumber_key" ON "GPOAccount"("gatePassNumber");

-- CreateIndex
CREATE UNIQUE INDEX "GPOAccount_email_key" ON "GPOAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorAccount_gatePassNumber_key" ON "VisitorAccount"("gatePassNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_corpEmail_key" ON "Admin"("corpEmail");

-- AddForeignKey
ALTER TABLE "GPOAccount" ADD CONSTRAINT "GPOAccount_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPOSession" ADD CONSTRAINT "GPOSession_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPOSession" ADD CONSTRAINT "GPOSession_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "GPOAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPOViolation" ADD CONSTRAINT "GPOViolation_accountViolatorId_fkey" FOREIGN KEY ("accountViolatorId") REFERENCES "GPOAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorSession" ADD CONSTRAINT "VisitorSession_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorSession" ADD CONSTRAINT "VisitorSession_visitorAccountId_fkey" FOREIGN KEY ("visitorAccountId") REFERENCES "VisitorAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorViolation" ADD CONSTRAINT "VisitorViolation_accountViolatorId_fkey" FOREIGN KEY ("accountViolatorId") REFERENCES "VisitorAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportGenerationLog" ADD CONSTRAINT "ReportGenerationLog_generatedByAdminId_fkey" FOREIGN KEY ("generatedByAdminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
