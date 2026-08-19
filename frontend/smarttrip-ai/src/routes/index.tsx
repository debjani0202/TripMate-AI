import type { ComponentType } from "react";

import { HomePage } from "@/pages/Home";
import { PlanTripPage } from "@/pages/PlanTrip";
import { TripGenerationPage } from "@/pages/TripGeneration";
import { TripDetailsPage } from "@/pages/TripDetails";
import { MyTripsPage } from "@/pages/MyTrips";
import { ProfilePage } from "@/pages/Profile";
import { BlogPage } from "@/pages/Blog";
import { SafetyPage } from "@/pages/Safety";
import { RecommendationsPage } from "@/pages/Recommendations";
import { DiscoverPage } from "@/pages/Discover";
import { LoginPage } from "@/pages/Login";
import { SignupPage } from "@/pages/Signup";
import { ForgotPasswordPage } from "@/pages/ForgotPassword";


interface RouteConfig {
  path: string;
  component: ComponentType;
}

// Single source of truth for top-level routes. Feature phases add their
// page component here without touching App.tsx.
export const routes: RouteConfig[] = [
  { path: "/login", component: LoginPage },
  { path: "/forgot-password", component: ForgotPasswordPage },
  { path: "/signup", component: SignupPage },
  { path: "/", component: HomePage },
  { path: "/plan-trip", component: PlanTripPage },
  { path: "/generate/:tripId", component: TripGenerationPage },
  { path: "/trips", component: MyTripsPage },
  { path: "/trips/:tripId", component: TripDetailsPage },
  { path: "/blog", component: BlogPage },
  { path: "/profile", component: ProfilePage },
  { path: "/safety", component: SafetyPage },
  { path: "/recommendations", component: RecommendationsPage },
  { path: "/discover", component: DiscoverPage },
];
