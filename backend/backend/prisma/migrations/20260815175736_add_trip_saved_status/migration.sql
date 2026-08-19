-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "is_saved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "updatedAt" DROP DEFAULT;
