import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Hotel,
  MapPin,
  Minus,
  Plus,
  Sparkles,
  TrainFront,
  Users,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { createTrip } from "@/services/api/trip.service";

import planTripBg from "@/assets/images/plan-trip/plan-trip-bg.jpeg";

export function PlanTripPage() {
  const navigate = useNavigate();

  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(50000);

  const [startDate, setStartDate] = useState("2026-09-14");
  const [endDate, setEndDate] = useState("2026-09-23");

  const [startingLocation, setStartingLocation] = useState("Kolkata");
  const [destination, setDestination] = useState("Rajasthan");

  const [currency, setCurrency] = useState("INR");
  const [travelStyle, setTravelStyle] = useState("Budget");

  const [transportPreference, setTransportPreference] =
    useState("Let AI Decide");

  const [hotelPreference, setHotelPreference] =
    useState("Let AI Decide");

  const increaseTravelers = () => {
    setTravelers((value) => Math.min(value + 1, 20));
  };

  const decreaseTravelers = () => {
    setTravelers((value) => Math.max(value - 1, 1));
  };

  const increaseBudget = () => {
    setBudget((value) => value + 5000);
  };

  const decreaseBudget = () => {
    setBudget((value) => Math.max(value - 5000, 5000));
  };

  const handleGenerateTrip = async () => {
    if (!startingLocation.trim() || !destination.trim()) {
      console.error(
        "Starting location and destination are required",
      );
      return;
    }

    if (!startDate || !endDate) {
      console.error("Start date and end date are required");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      console.error(
        "End date cannot be before start date",
      );
      return;
    }

    const numberOfDays =
      Math.floor(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    try {
      const response = await createTrip({
        startLocation: startingLocation.trim(),

        destination: destination.trim(),

        startDate,

        endDate,

        numberOfDays,

        numberOfTravelers: travelers,

        budget,

        currency,

        budgetRange: String(budget),

        travelStyle,

        transportMode: transportPreference,

        hotelPreference,

        foodPreference: "Let AI Decide",

        children: 0,

        seniors: 0,

        accessibilityRequired: false,

        interests: [],
      });

      console.log(
        "Trip created successfully:",
        response,
      );

      const tripId = response.data.trip.id;

      navigate(`/generate/${tripId}`);
    } catch (error) {
      console.error(
        "Failed to create trip:",
        error,
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4eee4] text-[#17233d]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <img
          src={planTripBg}
          alt=""
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#f5eee4]/20" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-[#f4eee4]/35" />
      </div>

      {/* Page content */}
      <div className="relative z-10 min-h-screen px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        {/* Back to home */}
        <div className="mx-auto max-w-[820px]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#33415c] transition hover:text-[#f26b21]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* Page heading */}
        <header className="mx-auto mb-5 mt-5 max-w-[760px] text-center sm:mt-6">
          <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#f26b21] shadow-sm sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" />
            AI Travel Planner
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-[#17233d] sm:text-4xl lg:text-[42px]">
            Plan your perfect trip
          </h1>

          <p className="mx-auto mt-2 max-w-[650px] text-xs leading-5 text-[#59657b] sm:text-sm">
            Tell us about your journey and let SmartTrip AI create a
            personalized itinerary for you.
          </p>
        </header>

        {/* Main travel-planning card */}
        <section className="mx-auto w-full max-w-[820px] overflow-hidden rounded-[1.35rem] border border-orange-200 bg-[#fffdf9]/95 shadow-[0_18px_55px_rgba(52,45,34,0.22)] backdrop-blur-sm">
          {/* Card header */}
          <div className="relative overflow-hidden border-b border-orange-100 px-5 py-4 sm:px-6 sm:py-5">
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#f26b21] sm:h-12 sm:w-12">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#17233d] sm:text-xl">
                  Trip Details
                </h2>

                <p className="mt-0.5 text-xs text-[#68748a] sm:text-sm">
                  Provide your travel preferences and let AI do the rest.
                </p>
              </div>
            </div>

            {/* Decorative travel route */}
            <div className="pointer-events-none absolute right-2 top-0 hidden h-full w-[36%] sm:block">
              <svg
                className="absolute right-3 top-3 h-[70px] w-[190px] opacity-45"
                viewBox="0 0 190 70"
                fill="none"
              >
                <path
                  d="M5 54C35 15 67 14 92 33C116 51 141 45 184 9"
                  stroke="#F26B21"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />

                <circle
                  cx="6"
                  cy="54"
                  r="4"
                  fill="#F26B21"
                />

                <circle
                  cx="184"
                  cy="9"
                  r="4"
                  fill="#F26B21"
                />
              </svg>
            </div>
          </div>

          {/* Scrollable form */}
          <div className="max-h-[60vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 lg:max-h-[560px]">
            {/* Section 1 */}
            <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#17233d]">
                    Where are you going?
                  </h3>

                  <p className="text-xs text-[#718096] sm:text-sm">
                    Choose your starting point and destination.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="starting-location"
                    className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                  >
                    Starting Location
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />

                    <input
                      id="starting-location"
                      value={startingLocation}
                      onChange={(event) =>
                        setStartingLocation(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-[#25324a] outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                  >
                    Destination
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />

                    <input
                      id="destination"
                      value={destination}
                      onChange={(event) =>
                        setDestination(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-[#25324a] outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#17233d]">
                    When are you travelling?
                  </h3>

                  <p className="text-xs text-[#718096] sm:text-sm">
                    Select your travel dates.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="start-date"
                    className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                  >
                    Start Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />

                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(event) =>
                        setStartDate(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-[#25324a] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="end-date"
                    className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                  >
                    End Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />

                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(event) =>
                        setEndDate(event.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-[#25324a] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#17233d]">
                    Trip Preferences
                  </h3>

                  <p className="text-xs text-[#718096] sm:text-sm">
                    Customize your travel experience.
                  </p>
                </div>
              </div>

              {/* Travelers */}
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-[#3f4b60]">
                  Travelers
                </label>

                <div className="flex h-11 max-w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-2">
                  <button
                    type="button"
                    onClick={decreaseTravelers}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#34415b] transition hover:bg-slate-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="text-sm font-semibold text-[#25324a]">
                    {travelers}
                  </span>

                  <button
                    type="button"
                    onClick={increaseTravelers}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#34415b] transition hover:bg-slate-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-[#3f4b60]">
                  Budget
                </label>

                <div className="flex h-11 items-center justify-between rounded-xl border border-slate-200 bg-white px-2">
                  <button
                    type="button"
                    onClick={decreaseBudget}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#34415b] transition hover:bg-slate-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#25324a]">
                    <Wallet className="h-4 w-4 text-green-500" />
                    {budget.toLocaleString("en-IN")}
                  </div>

                  <button
                    type="button"
                    onClick={increaseBudget}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#34415b] transition hover:bg-slate-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Currency */}
              <div className="mb-4">
                <label
                  htmlFor="currency"
                  className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                >
                  Currency
                </label>

                <div className="relative">
                  <Wallet className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />

                  <select
                    id="currency"
                    value={currency}
                    onChange={(event) =>
                      setCurrency(event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-[#25324a] outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label
                  htmlFor="travel-style"
                  className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                >
                  Travel Style
                </label>

                <div className="relative">
                  <select
                    id="travel-style"
                    value={travelStyle}
                    onChange={(event) =>
                      setTravelStyle(event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm font-medium text-[#25324a] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Comfort">Comfort</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Adventure">Adventure</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <TrainFront className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#17233d]">
                    Additional Preferences
                  </h3>

                  <p className="text-xs text-[#718096] sm:text-sm">
                    Let AI choose the best options for your journey.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Transport */}
                <div>
                  <label
                    htmlFor="transport"
                    className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                  >
                    Transport Preference
                  </label>

                  <div className="relative">
                    <TrainFront className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />

                    <select
                      id="transport"
                      value={transportPreference}
                      onChange={(event) =>
                        setTransportPreference(event.target.value)
                      }
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-[#25324a] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    >
                      <option value="Let AI Decide">
                        Let AI Decide
                      </option>
                      <option value="Flight">Flight</option>
                      <option value="Train">Train</option>
                      <option value="Bus">Bus</option>
                      <option value="Car">Car</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                  </div>
                </div>

                {/* Hotel */}
                <div>
                  <label
                    htmlFor="hotel"
                    className="mb-1.5 block text-xs font-semibold text-[#3f4b60]"
                  >
                    Hotel Preference
                  </label>

                  <div className="relative">
                    <Hotel className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />

                    <select
                      id="hotel"
                      value={hotelPreference}
                      onChange={(event) =>
                        setHotelPreference(event.target.value)
                      }
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-[#25324a] outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    >
                      <option value="Let AI Decide">
                        Let AI Decide
                      </option>
                      <option value="3 Star">3 Star</option>
                      <option value="4 Star">4 Star</option>
                      <option value="5 Star">5 Star</option>
                      <option value="Hostel">Hostel</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Generate section */}
          <div className="shrink-0 border-t border-orange-100 bg-[#fffaf4] p-3 sm:p-4">
            <div className="flex flex-col gap-3 rounded-xl border border-orange-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-[#f26b21]">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17233d]">
                    Ready to plan your trip?
                  </h3>

                  <p className="text-xs text-[#68748a]">
                    Our AI will create a personalized itinerary just for you.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateTrip}
                className="group inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#f56b16] px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(245,107,22,0.25)] transition hover:-translate-y-0.5 hover:bg-[#e95f0d] hover:shadow-[0_10px_25px_rgba(245,107,22,0.35)] sm:w-auto"
              >
                <Sparkles className="h-4 w-4" />

                Generate My Trip

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        <div className="h-4" />
      </div>
    </main>
  );
}