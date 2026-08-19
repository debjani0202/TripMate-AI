import prisma from "../../config/prisma.js";

// Data needed to create a trip
export interface CreateTripInput {
  startLocation?: string;
  destination: string;

  startDate?: Date;
  endDate?: Date;

  numberOfDays: number;
  numberOfTravelers: number;

  budget?: number;
  currency?: string;

  budgetRange: string;
  travelStyle: string;

  transportMode?: string;
  hotelPreference?: string;
  foodPreference?: string;

  notes?: string;
  specialRequirements?: string;

  children?: number;
  seniors?: number;
  accessibilityRequired?: boolean;

  interests?: string[];
}

// Create a new trip
export const createTrip = async (
  userId: number,
  input: CreateTripInput,
) => {
  const trip = await prisma.trip.create({
    data: {
      userId,

      startLocation: input.startLocation,
      destination: input.destination,

      startDate: input.startDate,
      endDate: input.endDate,

      numberOfDays: input.numberOfDays,
      numberOfTravelers: input.numberOfTravelers,

      budget: input.budget,
      currency: input.currency ?? "INR",

      budgetRange: input.budgetRange,
      travelStyle: input.travelStyle,

      transportMode: input.transportMode,
      hotelPreference: input.hotelPreference,
      foodPreference: input.foodPreference,

      notes: input.notes,
      specialRequirements: input.specialRequirements,

      children: input.children ?? 0,
      seniors: input.seniors ?? 0,

      accessibilityRequired:
        input.accessibilityRequired ?? false,

      // Create interests if provided
      interests: input.interests?.length
        ? {
            create: input.interests.map((interest) => ({
              interest,
            })),
          }
        : undefined,
    },

    // Include related trip data
    include: {
      interests: true,
      days: {
        include: {
          activities: true,
        },
      },
    },
  });

  return trip;
};

// Get only saved trips of the logged-in user
export const getMyTrips = async (userId: number) => {
  const trips = await prisma.trip.findMany({
    where: {
      userId,
      isSaved: true,
    },

    include: {
      interests: true,
      days: {
        include: {
          activities: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return trips;
};

// Get one trip by ID for the logged-in user
export const getTripById = async (
  tripId: number,
  userId: number,
) => {
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId,
    },

    include: {
      interests: true,
      days: {
        include: {
          activities: true,
        },
      },
    },
  });

  return trip;
};

// Save a trip
export const saveTrip = async (
  tripId: number,
  userId: number,
) => {
  // Check that the trip belongs to this user
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId,
    },
  });

  if (!trip) {
    return null;
  }

  // Mark the trip as saved
  const savedTrip = await prisma.trip.update({
    where: {
      id: tripId,
    },

    data: {
      isSaved: true,
    },

    include: {
      interests: true,
      days: {
        include: {
          activities: true,
        },
      },
    },
  });

  return savedTrip;
};

// Remove a trip from saved trips
export const unsaveTrip = async (
  tripId: number,
  userId: number,
) => {
  // Check that the trip belongs to this user
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId,
    },
  });

  if (!trip) {
    return null;
  }

  // Mark the trip as not saved
  const unsavedTrip = await prisma.trip.update({
    where: {
      id: tripId,
    },

    data: {
      isSaved: false,
    },

    include: {
      interests: true,
      days: {
        include: {
          activities: true,
        },
      },
    },
  });

  return unsavedTrip;
};