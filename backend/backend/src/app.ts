import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";

import authRoutes from "./modules/auth/auth.routes.js";
import tripRoutes from "./modules/trips/trip.routes.js";
import itineraryRoutes from "./modules/itinerary/itinerary.routes.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication routes
app.use("/api/auth", authRoutes);

// Trip routes
app.use("/api/trips", tripRoutes);

// Itinerary routes
app.use("/api/itinerary", itineraryRoutes);

// Check if the backend is running
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartTrip backend is running",
  });
});

// Check database connection
app.get("/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connection is working",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default app;