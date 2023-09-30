/*
  Warnings:

  - You are about to drop the column `userId` on the `UniversitySection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UniversitySection" DROP CONSTRAINT "UniversitySection_userId_fkey";

-- DropIndex
DROP INDEX "UniversitySection_userId_key";

-- AlterTable
ALTER TABLE "UniversitySection" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "universitySectionId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_universitySectionId_fkey" FOREIGN KEY ("universitySectionId") REFERENCES "UniversitySection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
