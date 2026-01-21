/*
  Warnings:

  - Added the required column `completedExercises` to the `unit_progresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExercises` to the `unit_progresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "unit_progresses" ADD COLUMN     "completedExercises" INTEGER NOT NULL,
ADD COLUMN     "totalExercises" INTEGER NOT NULL;
