-- CreateTable
CREATE TABLE "unit_progresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "unit_progresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "unit_progresses" ADD CONSTRAINT "unit_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_progresses" ADD CONSTRAINT "unit_progresses_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
