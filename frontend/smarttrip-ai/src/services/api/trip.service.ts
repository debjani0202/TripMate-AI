import apiClient from "./client";

export interface CreateTripRequest {
  startLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  numberOfTravelers: number;
  budget: number;
  currency: string;
  budgetRange: string;
  travelStyle: string;
  transportMode: string;
  hotelPreference: string;
  foodPreference: string;
  notes?: string;
  specialRequirements?: string;
  children?: number;
  seniors?: number;
  accessibilityRequired?: boolean;
  interests?: string[];
}

export interface Trip {
  id: number;
  userId: number;
  startLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  numberOfTravelers: number;
  budget: number;
  currency: string;
  budgetRange: string;
  travelStyle: string;
  transportMode?: string | null;
  hotelPreference: string;
  foodPreference: string;
  notes?: string | null;
  specialRequirements?: string | null;
  children: number;
  seniors: number;
  accessibilityRequired: boolean;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripResponse {
  success: boolean;
  message: string;
  data: {
    trip: Trip;
  };
}

export async function createTrip(
  data: CreateTripRequest,
): Promise<CreateTripResponse> {
  const response = await apiClient.post<CreateTripResponse>(
    "/trips",
    data,
  );

  return response.data;
}