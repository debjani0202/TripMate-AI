import {
  ArrowLeft,
  Download,
  Heart,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

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
  TravelRequest,
} from "@/services/api/itinerary.service";

import {
  saveGeneratedTrip,
} from "@/services/api/trip.service";

import { useAuth } from "@/context/AuthContext";

import type {
  TravelPlanOutput,
} from "@/services/api/itinerary.service";


export function TripGenerationPage() {
  const { tripId } = useParams();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

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
    useState(false);

  // Keep the original request so the generated plan can be saved later
  const [travelRequest, setTravelRequest] =
    useState<TravelRequest | null>(null);

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

  const generationInProgressRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const initialAgentStatuses = (): Record<
    string,
    AgentProgressItem["status"]
  > => ({
    research: "waiting",
    weather: "waiting",
    transport: "waiting",
    accommodation: "waiting",
    restaurants: "waiting",
    budget: "waiting",
    packing: "waiting",
    planner: "waiting",
  });

  const getAgentKey = (
    value: unknown,
  ): keyof typeof agentStatuses | null => {
    if (!value) {
      return null;
    }

    const name = String(value).trim().toLowerCase();

    // If the backend already sends the frontend key, use it directly.
    const directKeyMap: Record<
      string,
      keyof typeof agentStatuses
    > = {
      research: "research",
      weather: "weather",
      transport: "transport",
      accommodation: "accommodation",
      restaurants: "restaurants",
      restaurant: "restaurants",
      budget: "budget",
      packing: "packing",
      planner: "planner",
      "final planner": "planner",
    };

    if (directKeyMap[name]) {
      return directKeyMap[name];
    }

    // These are the actual CrewAI agent roles used by the backend.
    if (name === "research agent") {
      return "research";
    }

    if (name === "weather agent") {
      return "weather";
    }

    if (name === "route transport agent") {
      return "transport";
    }

    if (name === "accommodation agent") {
      return "accommodation";
    }

    if (name === "restaurants agent") {
      return "restaurants";
    }

    if (name === "travel budget analyst") {
      return "budget";
    }

    if (name === "smart packing assistant") {
      return "packing";
    }

    if (name === "ai travel planner") {
      return "planner";
    }

    // Task-name fallbacks. Keep Research LAST because other tasks
    // can contain the words "research" in their descriptions/prompts.
    if (
      name.includes("expected weather conditions") ||
      name.includes("weather conditions") ||
      name.includes("weather agent") ||
      name.includes("weather")
    ) {
      return "weather";
    }

    if (
      name.includes("route transport") ||
      name.includes("transportation options") ||
      name.includes("transportation") ||
      name.includes("transport agent") ||
      name.includes("transport")
    ) {
      return "transport";
    }

    if (
      name.includes("recommend accommodations") ||
      name.includes("accommodation") ||
      name.includes("hotel information") ||
      name.includes("hotel")
    ) {
      return "accommodation";
    }

    if (
      name.includes("restaurant recommendations") ||
      name.includes("recommended restaurants") ||
      name.includes("restaurants") ||
      name.includes("dining")
    ) {
      return "restaurants";
    }

    if (
      (name.includes("calculate") && name.includes("cost")) ||
      name.includes("estimated costs") ||
      name.includes("budget") ||
      name.includes("budget agent")
    ) {
      return "budget";
    }

    if (
      name.includes("packing list") ||
      name.includes("packing") ||
      name.includes("packing agent")
    ) {
      return "packing";
    }

    if (
      name.includes("final planner") ||
      name.includes("final travel plan") ||
      name.includes("putting everything together") ||
      name.includes("final planning")
    ) {
      return "planner";
    }

    if (
      name.includes("research travel information") ||
      name.includes("research the destination") ||
      name.includes("research only the top") ||
      name.includes("research agent")
    ) {
      return "research";
    }

    return null;
  };

  const getEventTaskName = (event: any): string => {
    const directValues = [
      event?.agent_role,
      event?.agent_name,
      event?.role,
      event?.task_name,
      event?.task,
      event?.name,
    ];

    for (const value of directValues) {
      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }

    if (event?.agent && typeof event.agent === "object") {
      return String(
        event.agent.role ??
          event.agent.name ??
          event.agent.agent_role ??
          "",
      );
    }

    if (typeof event?.agent === "string") {
      return event.agent;
    }

    return "";
  };

  const updateAgentStatus = (
    taskName: string,
    status: AgentProgressItem["status"],
  ) => {
    const taskKey = getAgentKey(taskName);

    console.log(
      `[SmartTrip SSE] ${status.toUpperCase()}:`,
      taskName,
      "->",
      taskKey,
    );

    if (!taskKey) {
      console.warn(
        "[SmartTrip SSE] Could not map backend task/agent to UI agent:",
        taskName,
      );
      return;
    }

    setAgentStatuses((current) => ({
      ...current,
      [taskKey]: status,
    }));
  };

  const runGeneration = async () => {
    if (generationInProgressRef.current) {
      return;
    }

    if (!tripId) {
      setError("Trip ID is missing.");
      setIsGenerating(false);
      return;
    }

    let request: TravelRequest | null = null;

    if (tripId === "new") {
      const stateRequest = location.state?.travelRequest;
      const cachedRequest = sessionStorage.getItem(
        "smarttrip_latest_request",
      );

      if (stateRequest) {
        request = stateRequest;
      } else if (cachedRequest) {
        try {
          request = JSON.parse(cachedRequest) as TravelRequest;
        } catch (parseError) {
          console.error(
            "Failed to parse cached travel request:",
            parseError,
          );
        }
      }
    }

    if (!request) {
      setError("Travel request is missing.");
      setIsGenerating(false);
      return;
    }

    generationInProgressRef.current = true;

    // Cancel any old stream before starting a new generation.
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setTravelRequest(request);
    setIsGenerating(true);
    setTravelPlan(null);
    setError(null);
    setAgentStatuses(initialAgentStatuses());

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/travel/plan/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(request),
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("text/event-stream")) {
        console.warn(
          "[SmartTrip SSE] Backend did not return text/event-stream:",
          contentType,
        );
      }

      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("Response body is not readable");
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let receivedFinalResult = false;

      const processSseLine = (line: string) => {
        const trimmedLine = line.trim();

        if (!trimmedLine || !trimmedLine.startsWith("data:")) {
          return;
        }

        const dataStr = trimmedLine.slice(5).trim();

        if (!dataStr) {
          return;
        }

        let event: any;

        try {
          event = JSON.parse(dataStr);
        } catch (parseError) {
          console.error(
            "[SmartTrip SSE] Failed to parse event:",
            dataStr,
            parseError,
          );
          return;
        }

        console.log("[SmartTrip SSE EVENT]", event);

        // Support both `event` and `type` so the frontend is tolerant
        // of the two event formats already used during development.
        const eventType = event?.event ?? event?.type;
        const taskName = getEventTaskName(event);

        switch (eventType) {
          case "task_started":
          case "agent_started": {
            updateAgentStatus(taskName, "running");
            break;
          }

          case "task_completed":
          case "agent_completed": {
            updateAgentStatus(taskName, "completed");
            break;
          }

          case "task_failed":
          case "agent_failed": {
            updateAgentStatus(taskName, "failed");

            throw new Error(
              event?.error ??
                event?.message ??
                event?.detail ??
                "CrewAI task failed",
            );
          }

          case "final_result": {
            receivedFinalResult = true;

            console.log(
              "[SmartTrip SSE] FINAL TRAVEL PLAN RECEIVED:",
              event?.travel_plan,
            );

            if (!event?.travel_plan) {
              throw new Error(
                "Backend returned final_result without a travel plan.",
              );
            }

            setTravelPlan(event.travel_plan as TravelPlanOutput);
            setIsGenerating(false);
            break;
          }

          case "error": {
            throw new Error(
              event?.message ??
                event?.detail ??
                event?.error ??
                "Generation failed",
            );
          }

          default:
            console.debug(
              "[SmartTrip SSE] Ignoring unknown event:",
              event,
            );
        }
      };

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          processSseLine(line);
        }
      }

      // Process any final complete event that arrived without a trailing
      // newline, then make sure the backend actually finished normally.
      buffer += decoder.decode();

      if (buffer.trim()) {
        processSseLine(buffer);
      }

      if (!receivedFinalResult) {
        throw new Error(
          "Generation stream ended before the final travel plan was received.",
        );
      }
    } catch (generationError) {
      if (
        generationError instanceof DOMException &&
        generationError.name === "AbortError"
      ) {
        return;
      }

      console.error(
        "Itinerary generation failed:",
        generationError,
      );

      setError(
        generationError instanceof Error
          ? generationError.message
          : "Unable to generate your itinerary. Please try again.",
      );

      setIsGenerating(false);
    } finally {
      generationInProgressRef.current = false;

      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  // --------------------------------------------------
  // Generate automatically when page opens
  // --------------------------------------------------



  // --------------------------------------------------
  // Generate automatically when page opens
  // --------------------------------------------------

  useEffect(() => {
    void runGeneration();

    return () => {
      abortControllerRef.current?.abort();
    };
    // This effect intentionally runs once when the generation page mounts.
    // runGeneration itself prevents duplicate concurrent executions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleWishlist = async () => {
    if (!travelPlan || !travelRequest) {
      return;
    }

    // A user must be logged in before a trip can be saved
    if (!isAuthenticated) {
      window.alert(
        "Please log in to save this trip to your wishlist.",
      );
      return;
    }

    // Removing a saved trip will be connected to the database in the My Trips step
    if (isWishlisted) {
      return;
    }

    try {
      await saveGeneratedTrip({
        startLocation: travelRequest.start_location,
        destination: travelRequest.destination,
        startDate: travelRequest.start_date,
        endDate: travelRequest.end_date,
        numberOfDays: travelRequest.days,
        numberOfTravelers: travelRequest.travelers,
        budget: travelRequest.budget,
        currency: travelRequest.currency,
        budgetRange: String(travelRequest.budget),
        travelStyle: travelRequest.travel_style,
        transportMode: travelRequest.transport_mode,
        hotelPreference: travelRequest.hotel_preference,
        foodPreference: travelRequest.food_preference,
        specialRequirements: travelRequest.special_requirements,
        children: travelRequest.children,
        seniors: travelRequest.seniors,
        accessibilityRequired: travelRequest.accessibility_required,
        interests: travelRequest.interests,
        travelPlan,
      });

      setIsWishlisted(true);
    } catch (error) {
      console.error(
        "Failed to save generated trip:",
        error,
      );

      window.alert(
        "Unable to save this trip. Please try again.",
      );
    }
  };

  // --------------------------------------------------
  // Error state
  // --------------------------------------------------

  if (error) {
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
  // Loading state
  // --------------------------------------------------

  if (isGenerating || !travelPlan) {
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
            {/* No AgentProgress here.
                This trip has already been generated. */}
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