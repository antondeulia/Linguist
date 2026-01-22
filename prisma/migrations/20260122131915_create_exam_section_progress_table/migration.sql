-- CreateEnum
CREATE TYPE "ExamSectionProgressStatusEnum" AS ENUM ('not_started', 'in_progress', 'completed');

-- CreateTable
CREATE TABLE "exam_section_progresses" (
    "id" TEXT NOT NULL,
    "state" "ExamSectionProgressStatusEnum" NOT NULL DEFAULT 'not_started',
    "user_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "exam_section_progresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exam_section_progresses_user_id_section_id_key" ON "exam_section_progresses"("user_id", "section_id");

-- AddForeignKey
ALTER TABLE "exam_section_progresses" ADD CONSTRAINT "exam_section_progresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_section_progresses" ADD CONSTRAINT "exam_section_progresses_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "exam_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
