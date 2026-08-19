import {
  ExternalLink,
  Hotel,
  MapPin,
  Star,
} from "lucide-react";

import type { AccommodationCity } from "@/types/travel";

interface AccommodationSectionProps {
  accommodation: AccommodationCity[];
}

// Show hotel recommendations for each city.
export function AccommodationSection({
  accommodation,
}: AccommodationSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-[#191c22] sm:p-6">

      {/* Section heading */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
          Where to stay
        </p>

        <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
          Hotels
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Accommodation recommendations selected for your journey.
        </p>
      </div>


      {/* Hotel cards */}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">

        {accommodation.map((hotel, index) => (

          <article
            key={`${hotel.city}-${hotel.hotel_name}-${index}`}
            className="rounded-2xl border border-border p-4 transition hover:border-orange-200 hover:shadow-sm dark:hover:border-orange-800"
          >

            {/* City */}

            <div className="flex items-center gap-2">

              <MapPin className="h-4 w-4 text-accent" />

              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {hotel.city}
              </span>

            </div>


            {/* Hotel information */}

            <div className="mt-3 flex gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-accent dark:bg-orange-950/40">
                <Hotel className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-sm font-semibold text-foreground">
                  {hotel.hotel_name}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">

                  <span className="flex items-center gap-1 text-xs text-muted-foreground">

                    <Star className="h-3.5 w-3.5 fill-current text-amber-500" />

                    {hotel.rating}

                  </span>

                  <span className="text-xs text-muted-foreground">
                    {hotel.price_per_night} / night
                  </span>

                </div>

              </div>

            </div>


            {/* Why this hotel is recommended */}

            <div className="mt-4 rounded-xl bg-secondary/50 p-3 dark:bg-[#252932]">

              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Why we recommend it
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {hotel.why_recommended}
              </p>

            </div>


            {/* Booking link */}

            {hotel.booking_link && (
              <a
                href={hotel.booking_link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
              >
                View booking option

                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

          </article>

        ))}

      </div>

    </section>
  );
}