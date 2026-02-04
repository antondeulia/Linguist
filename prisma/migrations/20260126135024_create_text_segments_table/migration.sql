/*
  Warnings:

  - You are about to drop the column `text` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `direction` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raw` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `exercises` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "text",
ADD COLUMN     "direction" TEXT NOT NULL,
ADD COLUMN     "raw" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "text_segments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "hover" BOOLEAN NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "text_segments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "text_segments" ADD CONSTRAINT "text_segments_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
