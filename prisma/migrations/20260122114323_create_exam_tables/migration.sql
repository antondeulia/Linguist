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
    "type" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,

    CONSTRAINT "exam_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_tasks" (
    "id" TEXT NOT NULL,
    "task_type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "time_limit" INTEGER,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "exam_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_task_attempts" (
    "id" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_task_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_task_evaluations" (
    "id" TEXT NOT NULL,
    "rubricScores" JSONB NOT NULL,
    "normalizedScore" DOUBLE PRECISION NOT NULL,
    "attempt_id" TEXT NOT NULL,

    CONSTRAINT "exam_task_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exam_task_evaluations_attempt_id_key" ON "exam_task_evaluations"("attempt_id");

-- AddForeignKey
ALTER TABLE "exam_sections" ADD CONSTRAINT "exam_sections_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tasks" ADD CONSTRAINT "exam_tasks_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "exam_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_task_attempts" ADD CONSTRAINT "exam_task_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_task_attempts" ADD CONSTRAINT "exam_task_attempts_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "exam_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_task_evaluations" ADD CONSTRAINT "exam_task_evaluations_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "exam_task_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
