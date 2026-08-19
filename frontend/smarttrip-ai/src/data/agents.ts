import {
  BedDouble,
  CloudSun,
  Luggage,
  Route,
  Search,
  Sparkles,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { AgentName } from "@/types/agent.types";

export interface AgentInfo {
  name: AgentName;
  icon: LucideIcon;
  description: string;
}

export const AGENT_TEAM: AgentInfo[] = [
  { name: "Research Agent", icon: Search, description: "Scouts destinations and points of interest" },
  { name: "Weather Agent", icon: CloudSun, description: "Checks forecasts to time each day right" },
  { name: "Accommodation Agent", icon: BedDouble, description: "Finds stays that match your style and budget" },
  { name: "Restaurant Agent", icon: UtensilsCrossed, description: "Curates dining for every taste" },
  { name: "Transport Agent", icon: Route, description: "Plans routes and transport between stops" },
  { name: "Budget Agent", icon: Wallet, description: "Keeps every recommendation within budget" },
  { name: "Packing Agent", icon: Luggage, description: "Builds a packing list for the trip ahead" },
  { name: "Final Planner Agent", icon: Sparkles, description: "Combines every agent's work into one itinerary" },
];
