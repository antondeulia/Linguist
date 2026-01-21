-- DropForeignKey
ALTER TABLE "exercise_progresses" DROP CONSTRAINT "exercise_progresses_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "exercise_progresses" DROP CONSTRAINT "exercise_progresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "unit_progresses" DROP CONSTRAINT "unit_progresses_unitId_fkey";

-- DropForeignKey
ALTER TABLE "unit_progresses" DROP CONSTRAINT "unit_progresses_userId_fkey";

-- AddForeignKey
ALTER TABLE "unit_progresses" ADD CONSTRAINT "unit_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_progresses" ADD CONSTRAINT "unit_progresses_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_progresses" ADD CONSTRAINT "exercise_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_progresses" ADD CONSTRAINT "exercise_progresses_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
