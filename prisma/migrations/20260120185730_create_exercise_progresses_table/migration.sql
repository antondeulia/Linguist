-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "sourceLang" DROP DEFAULT,
ALTER COLUMN "targetLang" DROP DEFAULT;

-- CreateTable
CREATE TABLE "exercise_progresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "exercise_progresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercise_progresses" ADD CONSTRAINT "exercise_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_progresses" ADD CONSTRAINT "exercise_progresses_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
