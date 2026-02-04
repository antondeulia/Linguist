-- CreateTable
CREATE TABLE "section_progresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "section_progresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "section_progresses" ADD CONSTRAINT "section_progresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_progresses" ADD CONSTRAINT "section_progresses_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
