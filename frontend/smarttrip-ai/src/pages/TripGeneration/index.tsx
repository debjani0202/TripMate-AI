import {
  ArrowLeft,
  Download,
  Heart,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { AgentProgress } from "@/components/trip/AgentProgress";
import type { AgentProgressItem } from "@/components/trip/AgentProgress";

import { TripChatbot } from "@/components/trip/TripChatbot";

import { TripOverview } from "@/components/trip/TripOverview";
import { ItinerarySection } from "@/components/trip/ItinerarySection";
import { TransportSection } from "@/components/trip/TransportSection";
import { AccommodationSection } from "@/components/trip/AccommodationSection";
import { RestaurantSection } from "@/components/trip/RestaurantSection";
import { BudgetSection } from "@/components/trip/BudgetSection";
import { PackingSection } from "@/components/trip/PackingSection";

import {
  generateItinerary,
} from "@/services/api/itinerary.service";

import type {
  TravelPlanOutput,
} from "@/types/travelPlan";

export function TripGenerationPage() {
  const { tripId } = useParams();

  // --------------------------------------------------
  // Trip generation state
  // --------------------------------------------------

  const [travelPlan, setTravelPlan] =
    useState<TravelPlanOutput | null>(null);

  const [isGenerating, setIsGenerating] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // --------------------------------------------------
  // Wishlist
  // --------------------------------------------------

  const [isWishlisted, setIsWishlisted] =
    useState(() => {
      if (!tripId) {
        return false;
      }

      return (
        localStorage.getItem(
          `smarttrip-wishlist-${tripId}`,
        ) !== null
      );
    });

  // --------------------------------------------------
  // Dynamic agent workflow
  // --------------------------------------------------

  const [agentStatuses, setAgentStatuses] =
    useState<Record<string, AgentProgressItem["status"]>>(
      {
        research: "waiting",
        weather: "waiting",
        transport: "waiting",
        accommodation: "waiting",
        restaurants: "waiting",
        budget: "waiting",
        packing: "waiting",
        planner: "waiting",
      },
    );

  // --------------------------------------------------
  // Agent definitions
  // --------------------------------------------------

  const agentDefinitions = [
    {
      id: "research",
      name: "Research",
      description:
        "Finding destinations and activities",
    },
    {
      id: "weather",
      name: "Weather",
      description:
        "Checking destination conditions",
    },
    {
      id: "transport",
      name: "Transport",
      description:
        "Finding transportation options",
    },
    {
      id: "accommodation",
      name: "Accommodation",
      description:
        "Selecting suitable stays",
    },
    {
      id: "restaurants",
      name: "Restaurants",
      description:
        "Finding local dining options",
    },
    {
      id: "budget",
      name: "Budget",
      description:
        "Calculating estimated costs",
    },
    {
      id: "packing",
      name: "Packing",
      description:
        "Preparing your packing list",
    },
    {
      id: "planner",
      name: "Final Planner",
      description:
        "Putting everything together",
    },
  ] as const;

  // --------------------------------------------------
  // Convert workflow state to AgentProgress format
  // --------------------------------------------------

  const agents: AgentProgressItem[] =
    agentDefinitions.map((agent) => ({
      ...agent,
      status:
        agentStatuses[agent.id],
    }));

  // --------------------------------------------------
  // Run itinerary generation
  // --------------------------------------------------

  const runGeneration = async () => {
    if (!tripId) {
      setError("Trip ID is missing.");
      setIsGenerating(false);
      return;
    }

    const parsedTripId = Number(tripId);

    if (
      !Number.isInteger(parsedTripId) ||
      parsedTripId <= 0
    ) {
      setError("Invalid trip ID.");
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    setTravelPlan(null);
    setError(null);

    // Reset workflow
    setAgentStatuses({
      research: "waiting",
      weather: "waiting",
      transport: "waiting",
      accommodation: "waiting",
      restaurants: "waiting",
      budget: "waiting",
      packing: "waiting",
      planner: "waiting",
    });

    try {
      // --------------------------------------------------
      // Start the visible workflow
      //
      // This is a frontend representation of the mock
      // AI generation process. The actual mock provider
      // runs on the Node backend.
      // --------------------------------------------------

      setAgentStatuses((current) => ({
        ...current,
        research: "running",
      }));

      await wait(250);

      setAgentStatuses((current) => ({
        ...current,
        research: "completed",
        weather: "running",
      }));

      await wait(250);

      setAgentStatuses((current) => ({
        ...current,
        weather: "completed",
        transport: "running",
      }));

      await wait(250);

      setAgentStatuses((current) => ({
        ...current,
        transport: "completed",
        accommodation: "running",
      }));

      await wait(250);

      setAgentStatuses((current) => ({
        ...current,
        accommodation: "completed",
        restaurants: "running",
      }));

      await wait(250);

      setAgentStatuses((current) => ({
        ...current,
        restaurants: "completed",
        budget: "running",
      }));

      await wait(250);

      setAgentStatuses((current) => ({
        ...current,
        budget: "completed",
        packing: "running",
      }));

      await wait(250);

      setAgentStatuses((current) => ({
        ...current,
        packing: "completed",
        planner: "running",
      }));

      // --------------------------------------------------
      // Actual backend generation
      // --------------------------------------------------

      const response =
        await generateItinerary({
          tripId: parsedTripId,
        });

      // --------------------------------------------------
      // Final planner completed
      // --------------------------------------------------

      setAgentStatuses((current) => ({
        ...current,
        planner: "completed",
      }));

      // --------------------------------------------------
      // Store actual backend travel plan
      // --------------------------------------------------

      setTravelPlan(
        response.data.travelPlan as TravelPlanOutput,
      );

      setIsGenerating(false);
    } catch (generationError) {
      console.error(
        "Itinerary generation failed:",
        generationError,
      );

      setError(
        "Unable to generate your itinerary. Please try again.",
      );

      setIsGenerating(false);
    }
  };

  // --------------------------------------------------
  // Generate automatically when page opens
  // --------------------------------------------------

  useEffect(() => {
    runGeneration();
  }, [tripId]);

  // --------------------------------------------------
  // Download
  // --------------------------------------------------

  const handleDownloadItinerary = () => {
    window.print();
  };

  // --------------------------------------------------
  // Regenerate
  // --------------------------------------------------

  const handleRegenerate = () => {
    runGeneration();
  };

  // --------------------------------------------------
  // Wishlist
  // --------------------------------------------------

  const handleWishlist = () => {
    if (!tripId || !travelPlan) {
      return;
    }

    const storageKey =
      `smarttrip-wishlist-${tripId}`;

    if (isWishlisted) {
      localStorage.removeItem(storageKey);

      setIsWishlisted(false);

      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(travelPlan),
    );

    setIsWishlisted(true);
  };

  // --------------------------------------------------
  // Loading state
  // --------------------------------------------------

  if (isGenerating && !travelPlan) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] px-3 pb-24 pt-3 text-foreground dark:bg-[#111318] sm:px-5 sm:pt-4 lg:px-6">
        <div className="mx-auto max-w-7xl">

          <header className="mb-3 flex items-center justify-between gap-3">
            <Link
              to="/plan-trip"
              aria-label="Back to plan trip"
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-border
                bg-white
                text-muted-foreground
                transition
                hover:bg-secondary
                hover:text-foreground
                dark:bg-[#252932]
              "
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>

            <div
              className="
                shrink-0
                rounded-full
                border
                border-border
                bg-white
                px-2.5
                py-1
                text-[10px]
                text-muted-foreground
                dark:bg-[#252932]
              "
            >
              Trip #{tripId ?? "preview"}
            </div>
          </header>

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_285px]">

            <div className="min-w-0 space-y-4">

              <div className="rounded-2xl border border-border bg-white px-5 py-12 text-center shadow-sm dark:bg-[#191c22]">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-accent">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>

                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                  SmartTrip AI
                </p>

                <h1 className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  Your trip is being prepared
                </h1>

                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Our travel planning workflow is preparing your personalized itinerary.
                </p>

              </div>

            </div>

            <aside className="lg:sticky lg:top-4">
              <AgentProgress agents={agents} />
            </aside>

          </div>
        </div>

        <TripChatbot />
      </main>
    );
  }

  // --------------------------------------------------
  // Error state
  // --------------------------------------------------

  if (error || !travelPlan) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] px-3 py-6 text-foreground dark:bg-[#111318] sm:px-5 lg:px-6">
        <div className="mx-auto max-w-2xl">

          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm dark:bg-[#191c22]">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <RefreshCw className="h-5 w-5" />
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              SmartTrip AI
            </p>

            <h1 className="mt-1 font-display text-xl font-semibold text-foreground">
              We couldn't generate your trip
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {error ?? "Something went wrong while preparing your itinerary."}
            </p>

            <div className="mt-5 flex items-center justify-center gap-2">

              <Link
                to="/plan-trip"
                className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
              >
                Back to Plan Trip
              </Link>

              <button
                type="button"
                onClick={handleRegenerate}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try Again
              </button>

            </div>

          </div>

        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Generated travel plan
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-3 pb-24 pt-3 text-foreground dark:bg-[#111318] sm:px-5 sm:pt-4 lg:px-6">
      <div className="mx-auto max-w-7xl">

        {/* ================= PAGE TOP ================= */}

        <header className="mb-3 flex items-center justify-between gap-3 print:hidden">

          <Link
            to="/plan-trip"
            aria-label="Back to plan trip"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-border
              bg-white
              text-muted-foreground
              transition
              hover:bg-secondary
              hover:text-foreground
              dark:bg-[#252932]
            "
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>

          <div
            className="
              shrink-0
              rounded-full
              border
              border-border
              bg-white
              px-2.5
              py-1
              text-[10px]
              text-muted-foreground
              dark:bg-[#252932]
            "
          >
            Trip #{tripId ?? "preview"}
          </div>

        </header>

        {/* ================= MAIN LAYOUT ================= */}

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_285px]">

          {/* ================= LEFT SIDE ================= */}

          <div className="min-w-0 space-y-4">

            {/* Trip overview */}

            <TripOverview
              summary={travelPlan.trip_summary}
            />

            {/* ================= PREPARATION MESSAGE ================= */}

            <div className="rounded-2xl border border-border bg-white px-5 py-4 text-center shadow-sm dark:bg-[#191c22]">

              <div className="flex items-center justify-center gap-1.5">

                <Sparkles className="h-3.5 w-3.5 text-accent" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                  SmartTrip AI
                </p>

              </div>

              <h1 className="mt-1 font-display text-xl font-semibold text-foreground sm:text-2xl">
                Your personalized trip is ready
              </h1>

              <p className="mt-1 text-xs text-muted-foreground">
                {travelPlan.itinerary.length} day
                {travelPlan.itinerary.length === 1
                  ? ""
                  : "s"} planned for your journey.
              </p>

            </div>

            {/* ================= ITINERARY ================= */}

            <ItinerarySection
              itinerary={travelPlan.itinerary}
              currency={travelPlan.budget.currency}
            />

            {/* ================= TRANSPORT ================= */}

            <TransportSection
              transport={travelPlan.transport}
            />

            {/* ================= ACCOMMODATION ================= */}

            <AccommodationSection
              accommodation={travelPlan.accommodation}
            />

            {/* ================= RESTAURANTS ================= */}

            <RestaurantSection
              restaurants={travelPlan.restaurants}
            />

            {/* ================= BUDGET ================= */}

            <BudgetSection
              budget={travelPlan.budget}
            />

            {/* ================= PACKING ================= */}

            <PackingSection
              packing={travelPlan.packing}
            />

            {/* ================= TRAVEL NOTES ================= */}

            {(travelPlan.important_notes.length > 0 ||
              travelPlan.limitations.length > 0) && (

              <section
                className="
                  rounded-xl
                  border
                  border-border
                  bg-white
                  p-4
                  shadow-sm
                  dark:bg-[#191c22]
                  sm:p-5
                "
              >

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-accent">
                    Good to know
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-foreground">
                    Travel notes
                  </h2>
                </div>

                {/* Important notes */}

                {travelPlan.important_notes.length > 0 && (

                  <div className="mt-3">

                    <h3 className="text-xs font-semibold text-foreground">
                      Important notes
                    </h3>

                    <ul className="mt-1.5 space-y-1">

                      {travelPlan.important_notes.map(
                        (note, index) => (

                          <li
                            key={`note-${index}`}
                            className="text-[11px] leading-4 text-muted-foreground"
                          >
                            • {note}
                          </li>

                        ),
                      )}

                    </ul>

                  </div>

                )}

                {/* Limitations */}

                {travelPlan.limitations.length > 0 && (

                  <div className="mt-3 border-t border-border pt-3">

                    <h3 className="text-xs font-semibold text-foreground">
                      Planning limitations
                    </h3>

                    <ul className="mt-1.5 space-y-1">

                      {travelPlan.limitations.map(
                        (limitation, index) => (

                          <li
                            key={`limitation-${index}`}
                            className="text-[11px] leading-4 text-muted-foreground"
                          >
                            • {limitation}
                          </li>

                        ),
                      )}

                    </ul>

                  </div>

                )}

              </section>

            )}

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <aside
            className="
              lg:sticky
              lg:top-4
              print:hidden
            "
          >

            <AgentProgress agents={agents} />

          </aside>

        </div>

      </div>

      {/* =====================================================
          CHATBOT
      ====================================================== */}

      <TripChatbot />

      {/* =====================================================
          FLOATING ACTION BAR
      ====================================================== */}

      <div
        className="
          fixed
          bottom-4
          left-1/2
          z-40
          -translate-x-1/2
          print:hidden
        "
      >

        <div
          className="
            flex
            items-center
            gap-1.5
            rounded-2xl
            border
            border-white/80
            bg-white/90
            p-1.5
            shadow-[0_12px_40px_rgba(0,0,0,0.16)]
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-[#1b1e25]/95
            sm:gap-2
            sm:p-2
          "
        >

          {/* ================= REGENERATE ================= */}

          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="
              flex
              h-9
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-border
              bg-white
              px-3
              text-[11px]
              font-semibold
              text-foreground
              transition
              hover:bg-secondary
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-[#252932]
              dark:hover:bg-[#30343d]
              sm:px-4
              sm:text-xs
            "
          >

            <RefreshCw
              className={`h-3.5 w-3.5 ${
                isGenerating
                  ? "animate-spin"
                  : ""
              }`}
            />

            <span>
              {isGenerating
                ? "Generating..."
                : "Regenerate"}
            </span>

          </button>

          {/* ================= WISHLIST ================= */}

          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              isWishlisted
                ? "Remove trip from wishlist"
                : "Save trip to wishlist"
            }
            title={
              isWishlisted
                ? "Remove from wishlist"
                : "Save to wishlist"
            }
            className={`
              flex
              h-9
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              px-3
              text-[11px]
              font-semibold
              transition
              sm:px-4
              sm:text-xs
              ${
                isWishlisted
                  ? "border-orange-200 bg-orange-50 text-accent dark:border-orange-400/20 dark:bg-orange-950/30 dark:text-orange-300"
                  : "border-border bg-white text-foreground hover:border-orange-200 hover:text-accent dark:bg-[#252932] dark:hover:border-orange-400/30"
              }
            `}
          >

            <Heart
              className={`h-3.5 w-3.5 ${
                isWishlisted
                  ? "fill-current"
                  : ""
              }`}
            />

            <span>
              {isWishlisted
                ? "Saved"
                : "Wishlist"}
            </span>

          </button>

          {/* ================= DOWNLOAD ================= */}

          <button
            type="button"
            onClick={handleDownloadItinerary}
            className="
              flex
              h-9
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-primary
              px-3
              text-[11px]
              font-semibold
              text-primary-foreground
              transition
              hover:opacity-90
              sm:px-4
              sm:text-xs
            "
          >

            <Download className="h-3.5 w-3.5" />

            <span>
              Download Itinerary
            </span>

          </button>

        </div>

      </div>

      {/* =====================================================
          PRINT STYLES
      ====================================================== */}

      <style>{`

        @media print {

          body {
            background: white !important;
          }

          main {
            padding: 0 !important;
            background: white !important;
          }

          header,
          aside,
          [class*="fixed"] {
            display: none !important;
          }

          section {
            break-inside: avoid;
            box-shadow: none !important;
          }

          img {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          @page {
            margin: 12mm;
          }

        }

        @media (max-width: 640px) {

          .fixed.bottom-4 {
            width: auto;
            max-width: calc(100vw - 24px);
          }

          .fixed.bottom-4 > div {
            width: max-content;
          }

        }

      `}</style>

    </main>
  );
}

// --------------------------------------------------
// Small helper for the visible workflow.
// --------------------------------------------------

function wait(
  milliseconds: number,
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}