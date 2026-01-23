-- CreateEnum
CREATE TYPE "ExamTaskTypeEnum" AS ENUM ('reading', 'writing', 'speaking', 'listening');

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_sections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,

    CONSTRAINT "exam_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_tasks" (
    "id" TEXT NOT NULL,
    "type" "ExamTaskTypeEnum" NOT NULL,
    "prompt" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "exam_tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exam_sections" ADD CONSTRAINT "exam_sections_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tasks" ADD CONSTRAINT "exam_tasks_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "exam_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
