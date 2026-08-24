import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Loader2,
  MapPin,
  Plane,
} from "lucide-react";

import {
  getMyTrips,
  type Trip,
} from "@/services/api/trip.service";

import { useAuth } from "@/context/AuthContext";

export function MyTripsPage() {
  // Get the current authentication state
  const {
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();

  // Store saved trips
  const [trips, setTrips] = useState<Trip[]>([]);

  // Track loading state
  const [isLoading, setIsLoading] = useState(true);

  // Store API error
  const [error, setError] = useState<string | null>(null);

  // Fetch saved trips after authentication is restored
  useEffect(() => {
    const fetchMyTrips = async () => {
      // Wait for authentication restoration
      if (authLoading) {
        return;
      }

      // User is not logged in
      if (!isAuthenticated) {
        setTrips([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch saved trips from Node backend
        const response = await getMyTrips();

        setTrips(response.data.trips);
      } catch (err) {
        console.error(
          "Failed to fetch saved trips:",
          err,
        );

        setError(
          "Unable to load your saved trips. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyTrips();
  }, [authLoading, isAuthenticated]);

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3 py-24 text-center">
        <Loader2 className="h-8 w-8 animate-spin" />

        <h1 className="font-display text-2xl font-semibold">
          Loading your trips...
        </h1>

        <p className="max-w-md text-muted-foreground">
          We are fetching your saved trips.
        </p>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3 py-24 text-center">
        <Plane className="h-10 w-10" />

        <h1 className="font-display text-3xl font-semibold">
          My Trips
        </h1>

        <p className="max-w-md text-muted-foreground">
          Please log in to view your saved trips.
        </p>
      </div>
    );
  }

  // API error
  if (error) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3 py-24 text-center">
        <AlertCircle className="h-10 w-10" />

        <h1 className="font-display text-3xl font-semibold">
          Something went wrong
        </h1>

        <p className="max-w-md text-muted-foreground">
          {error}
        </p>
      </div>
    );
  }

  // No saved trips
  if (trips.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3 py-24 text-center">
        <Plane className="h-10 w-10" />

        <h1 className="font-display text-3xl font-semibold">
          My Trips
        </h1>

        <p className="max-w-md text-muted-foreground">
          You haven't saved any trips yet. Generate a
          trip and add it to your Wishlist to see it
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">
          My Trips
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your saved travel plans.
        </p>
      </div>

      {/* Horizontal trip cards */}
      <div className="space-y-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="flex min-h-[130px] items-center justify-between gap-6 rounded-xl border bg-card px-6 py-5 shadow-sm"
          >
            {/* Left side: trip summary */}
            <div className="min-w-0 flex-1">
              {/* Destination */}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 shrink-0" />

                <h2 className="font-display text-xl font-semibold">
                  {trip.destination}
                </h2>
              </div>

              {/* Starting location */}
              <p className="mt-1 text-sm text-muted-foreground">
                From {trip.startLocation}
              </p>

              {/* Date + duration */}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0" />

                  <span>
                    {new Date(
                      trip.startDate,
                    ).toLocaleDateString()}{" "}
                    →{" "}
                    {new Date(
                      trip.endDate,
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 shrink-0" />

                  <span>
                    {trip.numberOfDays}{" "}
                    {trip.numberOfDays === 1
                      ? "day"
                      : "days"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: More */}
            <a
              href={`/trips/${trip.id}`}
              className="shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}