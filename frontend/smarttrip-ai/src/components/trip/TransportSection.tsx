import {
  ArrowUpRight,
  Bus,
  Car,
  ExternalLink,
  Plane,
  Train,
} from "lucide-react";

import type { TransportSummary } from "@/types/travel";

interface TransportSectionProps {
  transport: TransportSummary;
}

// Choose an icon based on the transport type.
function TransportIcon({ mode }: { mode: string }) {
  const value = mode.toLowerCase();

  if (value.includes("flight") || value.includes("air")) {
    return <Plane className="h-5 w-5" />;
  }

  if (value.includes("train") || value.includes("rail")) {
    return <Train className="h-5 w-5" />;
  }

  if (
    value.includes("bus") ||
    value.includes("coach")
  ) {
    return <Bus className="h-5 w-5" />;
  }

  return <Car className="h-5 w-5" />;
}

export function TransportSection({
  transport,
}: TransportSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-[#191c22] sm:p-6">

      {/* Section heading */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
          Getting around
        </p>

        <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
          Transport
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Recommended transportation for your trip.
        </p>
      </div>


      {/* Recommended transport */}

      <div className="mt-5 rounded-2xl bg-secondary/50 p-5 dark:bg-[#22262e]">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-accent dark:bg-orange-950/40">
              <TransportIcon
                mode={transport.recommended_mode}
              />
            </div>

            <div>

              <p className="text-xs font-medium text-accent">
                Recommended
              </p>

              <h3 className="mt-0.5 text-base font-semibold text-foreground">
                {transport.recommended_mode}
              </h3>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {transport.provider}
              </p>

            </div>

          </div>


          {/* Estimated cost */}

          <div className="sm:text-right">

            <p className="text-xs text-muted-foreground">
              Estimated cost
            </p>

            <p className="mt-0.5 text-base font-semibold text-foreground">
              {transport.estimated_cost}
            </p>

          </div>

        </div>


        {/* Booking link */}

        {transport.booking_link && (
          <a
            href={transport.booking_link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition hover:underline"
          >
            View booking option

            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

      </div>


      {/* Alternative transport options */}

      {transport.alternative_options.length > 0 && (
        <div className="mt-5">

          <div className="mb-3 flex items-center justify-between">

            <h3 className="text-sm font-semibold text-foreground">
              Alternative options
            </h3>

            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />

          </div>


          <div className="grid gap-3 sm:grid-cols-2">

            {transport.alternative_options.map(
              (option, index) => (

                <div
                  key={`${option.mode}-${index}`}
                  className="rounded-xl border border-border p-4 transition hover:border-orange-200 dark:hover:border-orange-800"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground dark:bg-[#252932]">
                        <TransportIcon
                          mode={option.mode}
                        />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-foreground">
                          {option.mode}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {option.provider}
                        </p>

                      </div>

                    </div>


                    {/* Alternative cost */}

                    <p className="text-xs font-semibold text-foreground">
                      {option.estimated_cost}
                    </p>

                  </div>


                  {/* Alternative booking link */}

                  {option.booking_link && (
                    <a
                      href={option.booking_link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                    >
                      Booking option

                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                </div>

              ),
            )}

          </div>

        </div>
      )}

    </section>
  );
}