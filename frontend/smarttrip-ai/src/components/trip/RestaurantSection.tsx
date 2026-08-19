import {
  ChefHat,
  MapPin,
  Utensils,
} from "lucide-react";

import type { RestaurantCity } from "@/types/travel";

interface RestaurantSectionProps {
  restaurants: RestaurantCity[];
}

export function RestaurantSection({
  restaurants,
}: RestaurantSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-[#191c22] sm:p-6">

      {/* Section heading */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
          Local dining
        </p>

        <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
          Restaurants
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Food recommendations selected for your journey.
        </p>
      </div>


      {/* Restaurants by city */}

      <div className="mt-5 space-y-5">

        {restaurants.map((city, cityIndex) => (

          <div
            key={`${city.city}-${cityIndex}`}
            className="rounded-2xl border border-border p-4"
          >

            {/* City */}

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-orange-950/40">
                <MapPin className="h-4 w-4" />
              </div>

              <div>

                <p className="text-[11px] font-medium uppercase tracking-wide text-accent">
                  Dining in
                </p>

                <h3 className="text-sm font-semibold text-foreground">
                  {city.city}
                </h3>

              </div>

            </div>


            {/* Restaurant cards */}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">

              {city.recommended.map(
                (restaurant, restaurantIndex) => (

                  <article
                    key={`${restaurant.name}-${restaurantIndex}`}
                    className="rounded-xl bg-secondary/50 p-4 dark:bg-[#252932]"
                  >

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-accent shadow-sm dark:bg-[#191c22]">
                        <ChefHat className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">

                        <h4 className="text-sm font-semibold text-foreground">
                          {restaurant.name}
                        </h4>

                        <div className="mt-1 flex flex-wrap items-center gap-2">

                          <span className="flex items-center gap-1 text-xs text-muted-foreground">

                            <Utensils className="h-3 w-3" />

                            {restaurant.cuisine}

                          </span>

                          <span className="text-xs text-muted-foreground">
                            •
                          </span>

                          <span className="text-xs font-medium text-accent">
                            {restaurant.price_level}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* Must try */}

                    <div className="mt-3 border-t border-border pt-3">

                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Must try
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {restaurant.must_try}
                      </p>

                    </div>

                  </article>

                ),
              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}