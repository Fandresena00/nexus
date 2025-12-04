-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskStatus" "TaskStatus" NOT NULL DEFAULT 'TODO';
