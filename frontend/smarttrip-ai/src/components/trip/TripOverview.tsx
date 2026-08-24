import {
  CalendarDays,
  MapPin,
  Users,
  Wallet,
} from "lucide-react";

import type { TripSummary } from "@/types/travel";

import rajasthanImage from "@/assets/images/destinations/rajasthan.avif";
import baliImage from "@/assets/images/destinations/bali.avif";
import japanImage from "@/assets/images/destinations/japan.avif";
import singaporeImage from "@/assets/images/destinations/singapore.avif";
import parisImage from "@/assets/images/destinations/paris.avif";
import goaImage from "@/assets/images/destinations/goa.avif";

interface TripOverviewProps {
  summary: TripSummary;
}

// Get the correct destination image.
const getDestinationImage = (destination: string) => {
  const value = destination.toLowerCase().trim();

  if (value.includes("rajasthan")) {
    return rajasthanImage;
  }

  if (value.includes("bali")) {
    return baliImage;
  }

  if (value.includes("japan")) {
    return japanImage;
  }

  if (value.includes("singapore")) {
    return singaporeImage;
  }

  if (value.includes("paris")) {
    return parisImage;
  }

  if (value.includes("goa")) {
    return goaImage;
  }

  // For destinations that do not have
  // a dedicated local image yet, use a
  // neutral image instead of incorrectly
  // showing Rajasthan.
  return "";
};

export function TripOverview({
  summary,
}: TripOverviewProps) {
  // Format the travel date.
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format the budget with Indian number formatting.
  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  // Get image based on the user's destination.
  const destinationImage = getDestinationImage(
    summary.destination,
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm dark:bg-[#191c22]">

      {/* Destination image */}

      <div className="relative h-36 w-full overflow-hidden sm:h-40">
        {destinationImage ? (
          <img
            src={destinationImage}
            alt={summary.destination}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-orange-200 via-amber-100 to-orange-50 dark:from-[#3a2a1c] dark:via-[#29231d] dark:to-[#191c22]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/80">
            Trip overview
          </p>

          <div className="mt-1 flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-white" />

            <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {summary.destination}
            </h1>
          </div>
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-accent backdrop-blur-sm dark:bg-[#252932]/90">
          {summary.travel_style}
        </div>
      </div>

      {/* Trip information */}

      <div className="p-4 sm:p-5">

        <p className="text-xs text-muted-foreground">
          Your personalized journey is being prepared by SmartTrip AI.
        </p>

        {/* Trip details */}

        <div className="mt-4 grid gap-3 sm:grid-cols-3">

          {/* Travel dates */}

          <div className="rounded-xl bg-secondary/60 p-3 dark:bg-[#252932]">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />

              <span className="text-xs font-medium">
                Travel dates
              </span>
            </div>

            <p className="mt-1.5 text-sm font-semibold text-foreground">
              {formatDate(summary.start_date)}
            </p>

            <p className="text-xs text-muted-foreground">
              to {formatDate(summary.end_date)}
            </p>
          </div>

          {/* Number of travelers */}

          <div className="rounded-xl bg-secondary/60 p-3 dark:bg-[#252932]">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />

              <span className="text-xs font-medium">
                Travelers
              </span>
            </div>

            <p className="mt-1.5 text-sm font-semibold text-foreground">
              {summary.travelers}
            </p>

            <p className="text-xs text-muted-foreground">
              {summary.travelers === 1
                ? "Traveler"
                : "Travelers"}
            </p>
          </div>

          {/* Trip budget */}

          <div className="rounded-xl bg-secondary/60 p-3 dark:bg-[#252932]">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="h-4 w-4" />

              <span className="text-xs font-medium">
                Budget
              </span>
            </div>

            <p className="mt-1.5 text-sm font-semibold text-foreground">
              {summary.currency}{" "}
              {formatBudget(summary.budget)}
            </p>

            <p className="text-xs text-muted-foreground">
              Total trip budget
            </p>
          </div>
        </div>

        {/* Trip duration */}

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            Trip duration
          </span>

          <span className="text-sm font-semibold text-foreground">
            {summary.duration_days}{" "}
            {summary.duration_days === 1
              ? "day"
              : "days"}
          </span>
        </div>
      </div>
    </section>
  );
}