/*
  Warnings:

  - You are about to drop the column `section_id` on the `exam_tasks` table. All the data in the column will be lost.
  - You are about to drop the `ExamSectionAttempt` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `section_attempt_id` to the `exam_tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamSectionAttempt" DROP CONSTRAINT "ExamSectionAttempt_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSectionAttempt" DROP CONSTRAINT "ExamSectionAttempt_userId_fkey";

-- DropForeignKey
ALTER TABLE "exam_tasks" DROP CONSTRAINT "exam_tasks_section_id_fkey";

-- AlterTable
ALTER TABLE "exam_tasks" DROP COLUMN "section_id",
ADD COLUMN     "section_attempt_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExamSectionAttempt";

-- CreateTable
CREATE TABLE "exam_section_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "exam_section_attempts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exam_section_attempts" ADD CONSTRAINT "exam_section_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_section_attempts" ADD CONSTRAINT "exam_section_attempts_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "exam_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tasks" ADD CONSTRAINT "exam_tasks_section_attempt_id_fkey" FOREIGN KEY ("section_attempt_id") REFERENCES "exam_section_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
