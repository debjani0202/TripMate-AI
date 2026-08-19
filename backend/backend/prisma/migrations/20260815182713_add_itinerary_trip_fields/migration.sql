-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "accessibility_required" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "budget" INTEGER,
ADD COLUMN     "children" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "food_preference" TEXT,
ADD COLUMN     "hotel_preference" TEXT,
ADD COLUMN     "seniors" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "special_requirements" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3),
ADD COLUMN     "start_location" TEXT,
ADD COLUMN     "transport_mode" TEXT;
