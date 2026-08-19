import type {
  AIItineraryDay,
  TravelPlanOutput,
} from "../../providers/ai/ai.provider.js";

// Data needed to generate an itinerary for an existing trip
export interface GenerateItineraryInput {
  tripId: number;
}

// Data that Node will send to the FastAPI service
export interface ItineraryRequest {
  start_location: string;
  destination: string;
  start_date: string;
  end_date: string;
  days: number;
  budget: number;
  currency: string;
  travelers: number;
  interests: string[];
  travel_style: string;
  transport_mode: string;
  hotel_preference: string;
  food_preference: string;
  special_requirements: string;
  children: number;
  seniors: number;
  accessibility_required: boolean;
}

// Final itinerary returned by the AI service
export type GeneratedItinerary = TravelPlanOutput;

// One itinerary day
export type ItineraryDay = AIItineraryDay;

// One activity that will eventually be stored in the Activity table
export interface ItineraryActivity {
  time: string;
  place: string;
  type: string;
  description: string;
}