import apiClient from "./client";

// Data used when creating a normal trip
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

// Complete trip returned by the Node backend
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

  // Complete AI-generated travel plan saved in the database
  travelPlan?: unknown;

  createdAt: string;
  updatedAt: string;
}

// Response returned when creating a normal trip
export interface CreateTripResponse {
  success: boolean;
  message: string;
  data: {
    trip: Trip;
  };
}

// Data sent when saving an already-generated AI travel plan
export interface SaveGeneratedTripRequest {
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
  children: number;
  seniors: number;
  accessibilityRequired: boolean;
  interests?: string[];
  travelPlan: unknown;
}

// Response returned after saving a generated AI plan
export interface SaveGeneratedTripResponse {
  success: boolean;
  message: string;
  data: {
    trip: Trip;
  };
}

// Response returned when fetching all saved trips
export interface GetMyTripsResponse {
  success: boolean;
  message: string;
  data: {
    trips: Trip[];
  };
}

// Response returned when fetching one saved trip
export interface GetTripByIdResponse {
  success: boolean;
  message: string;
  data: {
    trip: Trip;
  };
}

// Create a normal trip
export async function createTrip(
  data: CreateTripRequest,
): Promise<CreateTripResponse> {
  const response =
    await apiClient.post<CreateTripResponse>(
      "/trips",
      data,
    );

  return response.data;
}

// Save an already-generated AI travel plan
export async function saveGeneratedTrip(
  data: SaveGeneratedTripRequest,
): Promise<SaveGeneratedTripResponse> {
  const response =
    await apiClient.post<SaveGeneratedTripResponse>(
      "/trips/save-generated",
      data,
    );

  return response.data;
}

// Get all saved trips of the logged-in user
export async function getMyTrips(): Promise<GetMyTripsResponse> {
  const response =
    await apiClient.get<GetMyTripsResponse>(
      "/trips",
    );

  return response.data;
}

// Get one saved trip belonging to the logged-in user
export async function getTripById(
  tripId: number,
): Promise<GetTripByIdResponse> {
  const response =
    await apiClient.get<GetTripByIdResponse>(
      `/trips/${tripId}`,
    );

  return response.data;
}