import apiClient from "./client";

export interface GenerateItineraryRequest {
  tripId: number;
}

export interface TripSummary {
  destination: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  travelers: number;
  budget: number;
  currency: string;
  travel_style: string;
}

export interface SelectedCity {
  city: string;
  why_visit: string;
  days_allocated: number;
}

export interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface AIItineraryDay {
  day: number;
  date: string;
  city: string;
  morning: string;
  afternoon: string;
  evening: string;
  meals: MealPlan;
  transport: string;
  hotel: string;
  estimated_daily_cost: number;
  tips: string[];
}

export interface WeatherCity {
  city: string;
  temperature: string;
  conditions: string;
  travel_advisory: string;
}

export interface WeatherSummary {
  overall_summary: string;
  cities: WeatherCity[];
}

export interface TransportOption {
  mode: string;
  provider: string;
  estimated_cost: string;
  booking_link: string;
}

export interface TransportSummary {
  recommended_mode: string;
  provider: string;
  estimated_cost: string;
  booking_link: string;
  alternative_options: TransportOption[];
}

export interface AccommodationCity {
  city: string;
  hotel_name: string;
  price_per_night: string;
  rating: string;
  booking_link: string;
  why_recommended: string;
}

export interface RestaurantItem {
  name: string;
  cuisine: string;
  price_level: string;
  must_try: string;
}

export interface RestaurantCity {
  city: string;
  recommended: RestaurantItem[];
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  miscellaneous: number;
}

export interface BudgetSummary {
  total_budget: number;
  estimated_cost: number;
  remaining: number;
  currency: string;
  status: string;
  breakdown: BudgetBreakdown;
}

export interface PackingList {
  clothing: string[];
  footwear: string[];
  electronics: string[];
  documents: string[];
  toiletries: string[];
  health: string[];
  miscellaneous: string[];
}

export interface TravelPlanOutput {
  trip_summary: TripSummary;
  selected_cities: SelectedCity[];
  itinerary: AIItineraryDay[];
  weather: WeatherSummary;
  transport: TransportSummary;
  accommodation: AccommodationCity[];
  restaurants: RestaurantCity[];
  budget: BudgetSummary;
  packing: PackingList;
  important_notes: string[];
  limitations: string[];
}

export interface GenerateItineraryResponse {
  success: boolean;
  message: string;
  data: {
    itinerary: unknown[];
    travelPlan: TravelPlanOutput;
  };
}

import axios from "axios";

export interface TravelRequest {
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

export interface TravelPlanResponse {
  success: boolean;
  message: string;
  travel_plan: TravelPlanOutput;
}

export async function generateTravelPlanDirect(
  data: TravelRequest,
): Promise<TravelPlanResponse> {
  const response = await axios.post<TravelPlanResponse>(
    "http://127.0.0.1:8000/travel/plan",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function generateItinerary(
  data: GenerateItineraryRequest,
): Promise<GenerateItineraryResponse> {
  const response =
    await apiClient.post<GenerateItineraryResponse>(
      "/itinerary/generate",
      data,
    );

  return response.data;
}