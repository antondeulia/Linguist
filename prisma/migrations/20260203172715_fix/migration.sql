/*
  Warnings:

  - You are about to drop the column `course_id` on the `tracks` table. All the data in the column will be lost.
  - Added the required column `section_id` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_course_id_fkey";

-- AlterTable
ALTER TABLE "tracks" DROP COLUMN "course_id",
ADD COLUMN     "section_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
