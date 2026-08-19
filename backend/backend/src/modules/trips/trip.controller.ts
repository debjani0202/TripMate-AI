import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createTrip,
  getMyTrips,
  getTripById,
  saveTrip,
  unsaveTrip,
} from "./trip.service.js";

// Create a new trip
export const createTripController = async (
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

    const {
      startLocation,
      destination,
      startDate,
      endDate,
      numberOfDays,
      numberOfTravelers,
      budget,
      currency,
      budgetRange,
      travelStyle,
      transportMode,
      hotelPreference,
      foodPreference,
      notes,
      specialRequirements,
      children,
      seniors,
      accessibilityRequired,
      interests,
    } = req.body;

    // Check required fields
    if (
      !startLocation ||
      !destination ||
      !startDate ||
      !endDate ||
      !numberOfDays ||
      !numberOfTravelers ||
      budget === undefined ||
      !travelStyle ||
      !hotelPreference ||
      !foodPreference
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Start location, destination, dates, number of days, travelers, budget, travel style, hotel preference and food preference are required",
      });
    }

    // Interests must be an array when provided
    if (interests !== undefined && !Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: "Interests must be an array",
      });
    }

    // Convert dates from the request into JavaScript Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Check that the dates are valid
    if (
      Number.isNaN(parsedStartDate.getTime()) ||
      Number.isNaN(parsedEndDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Start date or end date is invalid",
      });
    }

    // End date should not be before start date
    if (parsedEndDate < parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be before start date",
      });
    }

    // Convert numeric values
    const parsedNumberOfDays = Number(numberOfDays);
    const parsedNumberOfTravelers = Number(numberOfTravelers);
    const parsedBudget = Number(budget);
    const parsedChildren = children === undefined ? 0 : Number(children);
    const parsedSeniors = seniors === undefined ? 0 : Number(seniors);

    // Check numeric values
    if (
      !Number.isInteger(parsedNumberOfDays) ||
      parsedNumberOfDays <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Number of days must be a positive integer",
      });
    }

    if (
      !Number.isInteger(parsedNumberOfTravelers) ||
      parsedNumberOfTravelers <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Number of travelers must be a positive integer",
      });
    }

    if (!Number.isFinite(parsedBudget) || parsedBudget <= 0) {
      return res.status(400).json({
        success: false,
        message: "Budget must be a positive number",
      });
    }

    if (
      !Number.isInteger(parsedChildren) ||
      parsedChildren < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Children must be a non-negative integer",
      });
    }

    if (
      !Number.isInteger(parsedSeniors) ||
      parsedSeniors < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Seniors must be a non-negative integer",
      });
    }

    // Create the trip
    const trip = await createTrip(req.user.userId, {
      startLocation: String(startLocation).trim(),
      destination: String(destination).trim(),

      startDate: parsedStartDate,
      endDate: parsedEndDate,

      numberOfDays: parsedNumberOfDays,
      numberOfTravelers: parsedNumberOfTravelers,

      budget: parsedBudget,
      currency: currency
        ? String(currency).trim()
        : "INR",

      // Keep this field for the existing Trip structure.
      // Later we can map the UI budget selection properly.
      budgetRange: budgetRange
        ? String(budgetRange).trim()
        : String(parsedBudget),

      travelStyle: String(travelStyle).trim(),

      transportMode: transportMode
        ? String(transportMode).trim()
        : undefined,

      hotelPreference: String(hotelPreference).trim(),
      foodPreference: String(foodPreference).trim(),

      notes: notes
        ? String(notes).trim()
        : undefined,

      specialRequirements: specialRequirements
        ? String(specialRequirements).trim()
        : undefined,

      children: parsedChildren,
      seniors: parsedSeniors,

      accessibilityRequired:
        accessibilityRequired === true,

      interests,
    });

    return res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: {
        trip,
      },
    });
  } catch (error) {
    console.error("Create trip error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create trip",
    });
  }
};

// Get all saved trips
export const getMyTripsController = async (
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

    const trips = await getMyTrips(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Saved trips fetched successfully",
      data: {
        trips,
      },
    });
  } catch (error) {
    console.error("Get my trips error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trips",
    });
  }
};

// Get one trip by ID
export const getTripByIdController = async (
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

    // Get trip ID from URL
    const tripId = Number(req.params.tripId);

    // Validate trip ID
    if (!Number.isInteger(tripId) || tripId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID",
      });
    }

    // Find the trip belonging to this user
    const trip = await getTripById(
      tripId,
      req.user.userId,
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip fetched successfully",
      data: {
        trip,
      },
    });
  } catch (error) {
    console.error("Get trip by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trip",
    });
  }
};

// Save a trip
export const saveTripController = async (
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

    const tripId = Number(req.params.tripId);

    // Validate trip ID
    if (!Number.isInteger(tripId) || tripId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID",
      });
    }

    // Save only if the trip belongs to this user
    const trip = await saveTrip(
      tripId,
      req.user.userId,
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip saved successfully",
      data: {
        trip,
      },
    });
  } catch (error) {
    console.error("Save trip error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save trip",
    });
  }
};

// Remove a trip from saved trips
export const unsaveTripController = async (
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

    const tripId = Number(req.params.tripId);

    // Validate trip ID
    if (!Number.isInteger(tripId) || tripId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip ID",
      });
    }

    // Unsave only if the trip belongs to this user
    const trip = await unsaveTrip(
      tripId,
      req.user.userId,
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trip removed from saved trips",
      data: {
        trip,
      },
    });
  } catch (error) {
    console.error("Unsave trip error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove trip from saved trips",
    });
  }
};