/*
  Warnings:

  - The primary key for the `College` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "GPOAccount" DROP CONSTRAINT "GPOAccount_collegeId_fkey";

-- AlterTable
ALTER TABLE "College" DROP CONSTRAINT "College_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "College_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "College_id_seq";

-- AlterTable
ALTER TABLE "GPOAccount" ALTER COLUMN "collegeId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "GPOAccount" ADD CONSTRAINT "GPOAccount_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE SET NULL ON UPDATE CASCADE;
