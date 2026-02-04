-- CreateTable
CREATE TABLE "user_states" (
    "userId" TEXT NOT NULL,
    "theme" TEXT,
    "currentCourseId" TEXT,
    "currentSectionId" TEXT,

    CONSTRAINT "user_states_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_states_userId_key" ON "user_states"("userId");

-- AddForeignKey
ALTER TABLE "user_states" ADD CONSTRAINT "user_states_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
