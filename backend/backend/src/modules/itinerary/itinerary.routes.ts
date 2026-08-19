import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { generateItineraryController } from "./itinerary.controller.js";

const router = Router();

// Prepare an AI itinerary request
router.post(
  "/generate",
  authenticate,
  generateItineraryController,
);

export default router;