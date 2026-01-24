/*
  Warnings:

  - Added the required column `completed_units` to the `track_progresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_units` to the `track_progresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "track_progresses" ADD COLUMN     "completed_units" INTEGER NOT NULL,
ADD COLUMN     "total_units" INTEGER NOT NULL;
