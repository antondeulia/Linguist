-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "sourceLang" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "targetLang" TEXT NOT NULL DEFAULT 'en';
