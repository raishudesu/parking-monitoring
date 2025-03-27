-- CreateTable
CREATE TABLE "GPOAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gatePassNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "collegeId" TEXT,
    "department" TEXT,
    "isVIP" BOOLEAN NOT NULL DEFAULT false,
    "isPWD" BOOLEAN NOT NULL DEFAULT false,
    "imageLink" TEXT,
    "role" TEXT NOT NULL DEFAULT 'GPO',
    "creditScore" INTEGER DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GPOAccount_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GPOSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parkingSpaceId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shouldEndAt" DATETIME,
    "endTime" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'ONGOING',
    "endedProperly" BOOLEAN,
    CONSTRAINT "GPOSession_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GPOSession_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "GPOAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ParkingSessionRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ParkingSessionRating_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GPOSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GPOViolation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountViolatorId" TEXT NOT NULL,
    "violationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "violationType" TEXT NOT NULL,
    "pointsDeducted" INTEGER NOT NULL,
    CONSTRAINT "GPOViolation_accountViolatorId_fkey" FOREIGN KEY ("accountViolatorId") REFERENCES "GPOAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VisitorPassCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardNumber" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VisitorSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "visitTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitTime" DATETIME,
    "visitorPassId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ONGOING',
    CONSTRAINT "VisitorSession_visitorPassId_fkey" FOREIGN KEY ("visitorPassId") REFERENCES "VisitorPassCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ParkingSpace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longitude" TEXT,
    "latitude" TEXT,
    "spaceType" TEXT NOT NULL DEFAULT 'MIXED',
    "currCapacity" INTEGER DEFAULT 0,
    "maxCapacity" INTEGER NOT NULL,
    "currReservedCapacity" INTEGER DEFAULT 0,
    "reservedCapacity" INTEGER NOT NULL DEFAULT 1,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "polygon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "ParkingSpaceImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "parkingSpaceId" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ParkingSpaceImage_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "corpEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AdminLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportGenerationLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "generatedByAdminId" TEXT NOT NULL,
    "reportDescription" TEXT NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReportGenerationLog_generatedByAdminId_fkey" FOREIGN KEY ("generatedByAdminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegeName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserFeedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userGpoId" TEXT,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserFeedback_userGpoId_fkey" FOREIGN KEY ("userGpoId") REFERENCES "GPOAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DriverBehaviorReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportedByAccountId" TEXT NOT NULL,
    "parkingSpaceId" TEXT,
    "reportType" TEXT NOT NULL,
    "otherDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" DATETIME,
    "resolvedByAdminId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "DriverBehaviorReport_reportedByAccountId_fkey" FOREIGN KEY ("reportedByAccountId") REFERENCES "GPOAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DriverBehaviorReport_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "DriverBehaviorReport_resolvedByAdminId_fkey" FOREIGN KEY ("resolvedByAdminId") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DriverBehaviorReportImages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DriverBehaviorReportImages_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "DriverBehaviorReport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DowntimeLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "areViolationsWaived" BOOLEAN NOT NULL DEFAULT false,
    "adminId" TEXT NOT NULL,
    CONSTRAINT "DowntimeLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "GPOAccount_gatePassNumber_key" ON "GPOAccount"("gatePassNumber");

-- CreateIndex
CREATE UNIQUE INDEX "GPOAccount_email_key" ON "GPOAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSessionRating_sessionId_key" ON "ParkingSessionRating"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorPassCard_cardNumber_key" ON "VisitorPassCard"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_corpEmail_key" ON "Admin"("corpEmail");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
