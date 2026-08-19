import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";

import {
  createTripController,
  getMyTripsController,
  getTripByIdController,
  saveTripController,
  unsaveTripController,
} from "./trip.controller.js";

const router = Router();

// Create a new trip
router.post("/", authenticate, createTripController);

// Get all saved trips
router.get("/", authenticate, getMyTripsController);

// Get one trip by ID
router.get("/:tripId", authenticate, getTripByIdController);

// Save a trip
router.post(
  "/:tripId/save",
  authenticate,
  saveTripController,
);

// Remove a trip from saved trips
router.delete(
  "/:tripId/save",
  authenticate,
  unsaveTripController,
);

export default router;