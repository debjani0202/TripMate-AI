import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  generateItinerary,
} from "./itinerary.service.js";

// Generate an AI itinerary for an existing trip
export const generateItineraryController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    // Check if the user is logged in
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Get trip ID from request body
    const { tripId } = req.body;

    // Check if trip ID was provided
    if (tripId === undefined) {
      return res.status(400).json({
        success: false,
        message: "Trip ID is required",
      });
    }

    // Convert trip ID to number
    const parsedTripId = Number(tripId);

    // Validate trip ID
    if (
      !Number.isInteger(parsedTripId) ||
      parsedTripId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID",
      });
    }

    // Generate the itinerary using FastAPI
    const result = await generateItinerary(
      req.user.userId,
      {
        tripId: parsedTripId,
      },
    );

    // Trip was not found
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

   return res.status(200).json({
  success: true,
  message: "Itinerary generated successfully",
  data: {
    itinerary: result.itinerary,
    travelPlan: result.result.travelPlan,
  },
});
  } catch (error) {
    console.error(
      "Generate itinerary error:",
      error,
    );

    // Handle incomplete trip data
    if (
      error instanceof Error &&
      error.message ===
        "Trip is missing required itinerary information"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate itinerary",
    });
  }
};