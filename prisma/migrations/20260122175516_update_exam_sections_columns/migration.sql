/*
  Warnings:

  - You are about to drop the column `type` on the `exam_tasks` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExamSectionTypeEnum" AS ENUM ('reading', 'writing', 'speaking', 'listening');

-- AlterTable
ALTER TABLE "exam_sections" ADD COLUMN     "type" "ExamSectionTypeEnum" NOT NULL DEFAULT 'listening';

-- AlterTable
ALTER TABLE "exam_tasks" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ExamTaskTypeEnum";
