-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "number_of_days" INTEGER NOT NULL,
    "number_of_travelers" INTEGER NOT NULL,
    "budget_range" TEXT NOT NULL,
    "travel_style" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_interests" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "interest" TEXT NOT NULL,

    CONSTRAINT "trip_interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_days" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "day_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "trip_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "trip_day_id" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_interests" ADD CONSTRAINT "trip_interests_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_days" ADD CONSTRAINT "trip_days_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_trip_day_id_fkey" FOREIGN KEY ("trip_day_id") REFERENCES "trip_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;
