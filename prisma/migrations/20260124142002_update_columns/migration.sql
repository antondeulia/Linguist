/*
  Warnings:

  - You are about to drop the column `courseId` on the `tracks` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `units` table. All the data in the column will be lost.
  - Added the required column `course_id` to the `tracks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `track_id` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_courseId_fkey";

-- DropForeignKey
ALTER TABLE "units" DROP CONSTRAINT "units_trackId_fkey";

-- AlterTable
ALTER TABLE "tracks" DROP COLUMN "courseId",
ADD COLUMN     "course_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "units" DROP COLUMN "trackId",
ADD COLUMN     "track_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
