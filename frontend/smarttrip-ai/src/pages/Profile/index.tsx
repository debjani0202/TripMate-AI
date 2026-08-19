import { useState } from "react";
import {
  CheckCircle2,
  Globe2,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plane,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import planTripBg from "@/assets/images/plan-trip/plan-trip-bg.jpeg";

export function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

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
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <section className="w-full max-w-[560px] overflow-hidden rounded-[1.5rem] border border-orange-200/80 bg-[#fffdf9]/95 shadow-[0_20px_60px_rgba(52,45,34,0.24)] backdrop-blur-sm">
          {/* Profile header */}
          <div className="relative border-b border-orange-100 px-5 pb-7 pt-8 text-center sm:px-8 sm:pt-9">
            {/* Decorative travel route */}
            <div className="pointer-events-none absolute right-0 top-0 h-28 w-40 overflow-hidden opacity-40">
              <svg
                viewBox="0 0 160 110"
                className="h-full w-full"
                fill="none"
              >
                <path
                  d="M-5 85C30 45 55 60 78 42C102 23 123 27 165 -8"
                  stroke="#F26B21"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />

                <circle
                  cx="5"
                  cy="82"
                  r="4"
                  fill="#F26B21"
                />

                <circle
                  cx="151"
                  cy="3"
                  r="4"
                  fill="#F26B21"
                />
              </svg>
            </div>

            {/* Neutral profile icon */}
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-orange-50 text-[#f56b16] shadow-[0_8px_25px_rgba(52,45,34,0.16)] sm:h-32 sm:w-32">
              <UserRound className="h-14 w-14 sm:h-16 sm:w-16" />
            </div>

            <div className="mt-5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-[#17233d] sm:text-[26px]">
                Your Profile
              </h1>

              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#f26b21]">
                <Plane className="h-3 w-3" />
                SmartTrip Explorer
              </div>

              <p className="mx-auto mt-3 max-w-[400px] text-xs leading-5 text-[#68748a] sm:text-sm">
                Sign in to personalize your SmartTrip experience and manage
                your traveler profile.
              </p>
            </div>
          </div>

          {/* Account state */}
          <div className="px-5 py-5 sm:px-8 sm:py-6">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[#17233d]">
                Profile Information
              </h2>

              <p className="mt-0.5 text-xs text-[#718096]">
                Your account details will appear here after you sign in.
              </p>
            </div>

            {/* Not logged in notice */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#f56b16] shadow-sm">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17233d]">
                    You're not signed in
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#68748a]">
                    Log in to view and update your name, age, phone number,
                    location, and other profile information.
                  </p>
                </div>
              </div>
            </div>

            {/* Disabled profile fields preview */}
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 opacity-70">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
                  <UserRound className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                    Full Name
                  </p>

                  <p className="text-sm font-semibold text-[#8a94a6]">
                    Not available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 opacity-70">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  <UserRound className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                    Age
                  </p>

                  <p className="text-sm font-semibold text-[#8a94a6]">
                    Not available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 opacity-70">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#f26b16]">
                  <Mail className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                    Login Email
                  </p>

                  <p className="text-sm font-semibold text-[#8a94a6]">
                    Not signed in
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 opacity-70">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                    Phone
                  </p>

                  <p className="text-sm font-semibold text-[#8a94a6]">
                    Not available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 opacity-70 sm:col-span-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-[#8a94a6]">
                    Not available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Travel activity */}
          <div className="border-t border-orange-100 bg-[#fffaf4] px-5 py-5 sm:px-8">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[#17233d]">
                Travel Activity
              </h2>

              <p className="mt-0.5 text-xs text-[#718096]">
                Your SmartTrip activity will appear here once you start
                planning trips.
              </p>
            </div>

            <div className="grid grid-cols-3 divide-x divide-orange-100 overflow-hidden rounded-xl border border-orange-200 bg-white">
              <div className="flex flex-col items-center px-2 py-3.5 text-center">
                <Plane className="mb-1.5 h-4 w-4 text-[#f26b21]" />

                <span className="text-lg font-bold text-[#17233d]">
                  —
                </span>

                <span className="mt-0.5 text-[9px] font-semibold leading-3 text-[#7b8798] sm:text-[10px]">
                  Trips Planned
                </span>
              </div>

              <div className="flex flex-col items-center px-2 py-3.5 text-center">
                <MapPin className="mb-1.5 h-4 w-4 text-[#f26b21]" />

                <span className="text-lg font-bold text-[#17233d]">
                  —
                </span>

                <span className="mt-0.5 text-[9px] font-semibold leading-3 text-[#7b8798] sm:text-[10px]">
                  Saved Places
                </span>
              </div>

              <div className="flex flex-col items-center px-2 py-3.5 text-center">
                <Globe2 className="mb-1.5 h-4 w-4 text-[#f26b21]" />

                <span className="text-lg font-bold text-[#17233d]">
                  —
                </span>

                <span className="mt-0.5 text-[9px] font-semibold leading-3 text-[#7b8798] sm:text-[10px]">
                  Countries Visited
                </span>
              </div>
            </div>
          </div>

          {/* Sign in / logout */}
          <div className="border-t border-orange-100 px-5 py-5 sm:px-8">
            <Link
              to="/login"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#f56b16] px-5 text-sm font-bold text-white shadow-[0_7px_18px_rgba(245,107,22,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e95f0d] hover:shadow-[0_9px_22px_rgba(245,107,22,0.3)]"
            >
              <LogIn className="h-4 w-4" />
              Log In
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}