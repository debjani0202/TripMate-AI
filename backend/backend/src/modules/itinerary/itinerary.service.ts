import prisma from "../../config/prisma.js";

import {
  fastAPIProvider,
} from "../../providers/ai/fastapi.provider.js";

import type {
  GenerateItineraryInput,
  ItineraryRequest,
} from "./itinerary.types.js";

import {
  mapTravelPlanToItinerary,
} from "./itinerary.mapper.js";

// Prepare trip data in the format expected by the AI provider
export const prepareItineraryRequest = async (
  userId: number,
  input: GenerateItineraryInput,
): Promise<ItineraryRequest | null> => {
  // Find the trip only if it belongs to the logged-in user
  const trip = await prisma.trip.findFirst({
    where: {
      id: input.tripId,
      userId,
    },
    include: {
      interests: true,
    },
  });

  // Trip does not exist or belongs to another user
  if (!trip) {
    return null;
  }

  // Check that the required AI fields are available
  if (
    !trip.startLocation ||
    !trip.startDate ||
    !trip.endDate ||
    trip.budget === null ||
    !trip.hotelPreference ||
    !trip.foodPreference
  ) {
    throw new Error(
      "Trip is missing required itinerary information",
    );
  }

  // Convert database fields to AI request fields
  const itineraryRequest: ItineraryRequest = {
    start_location: trip.startLocation,

    destination: trip.destination,

    start_date: trip.startDate
      .toISOString()
      .split("T")[0],

    end_date: trip.endDate
      .toISOString()
      .split("T")[0],

    days: trip.numberOfDays,

    budget: trip.budget,

    currency: trip.currency,

    travelers: trip.numberOfTravelers,

    interests: trip.interests.map(
      (item) => item.interest,
    ),

    travel_style: trip.travelStyle,

    transport_mode: trip.transportMode ?? "",

    hotel_preference: trip.hotelPreference,

    food_preference: trip.foodPreference,

    special_requirements:
      trip.specialRequirements ?? "None",

    children: trip.children,

    seniors: trip.seniors,

    accessibility_required:
      trip.accessibilityRequired,
  };

  return itineraryRequest;
};

// Generate an itinerary using the FastAPI AI provider
export const generateItinerary = async (
  userId: number,
  input: GenerateItineraryInput,
) => {
  // Prepare the trip data
  const itineraryRequest =
    await prepareItineraryRequest(
      userId,
      input,
    );

  // Trip was not found
  if (!itineraryRequest) {
    return null;
  }

  // Generate the itinerary using the FastAPI AgentBackend
  const aiResponse =
    await fastAPIProvider.generateItinerary(
      itineraryRequest,
    );

  // Convert the AI itinerary into our
  // database-friendly structure
  const mappedItinerary =
    mapTravelPlanToItinerary(
      aiResponse.travelPlan,
    );

  // Safety check:
  // The generated itinerary must contain
  // exactly the number of days requested.
  if (
    mappedItinerary.length !==
    itineraryRequest.days
  ) {
    throw new Error(
      `Generated itinerary contains ${mappedItinerary.length} days, but ${itineraryRequest.days} days were requested`,
    );
  }

  // Save the generated itinerary in one transaction
  const savedItinerary =
    await prisma.$transaction(async (tx) => {
      // Remove an older generated itinerary
      // for this trip before saving the new one.
      await tx.tripDay.deleteMany({
        where: {
          tripId: input.tripId,
        },
      });

      const days = [];

      for (const day of mappedItinerary) {
        const tripDay = await tx.tripDay.create({
          data: {
            tripId: input.tripId,
            dayNumber: day.dayNumber,
            title: day.title,

            activities: {
              create: day.activities.map(
                (activity) => ({
                  time: activity.time,
                  place: activity.place,
                  type: activity.type,
                  description:
                    activity.description,
                }),
              ),
            },
          },

          include: {
            activities: true,
          },
        });

        days.push(tripDay);
      }

      return days;
    });

  return {
    request: itineraryRequest,

    result: aiResponse,

    itinerary: savedItinerary,
  };
};