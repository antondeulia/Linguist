-- CreateTable
CREATE TABLE "track_progresses" (
    "id" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    "track_id" TEXT NOT NULL,

    CONSTRAINT "track_progresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "track_progresses" ADD CONSTRAINT "track_progresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track_progresses" ADD CONSTRAINT "track_progresses_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
