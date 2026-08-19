import type {
  AIItineraryRequest,
  AIItineraryResponse,
  AIProvider,
  TravelPlanOutput,
} from "./ai.provider.js";

// FastAPI base URL
const FASTAPI_BASE_URL =
  process.env.FASTAPI_BASE_URL || "http://127.0.0.1:8000";

// FastAPI AI provider
export class FastAPIProvider implements AIProvider {
  async generateItinerary(
    input: AIItineraryRequest,
  ): Promise<AIItineraryResponse> {
    // Send the itinerary request to FastAPI
    const response = await fetch(
      `${FASTAPI_BASE_URL}/travel/plan`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(input),
      },
    );

    // FastAPI returned an error
    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "FastAPI itinerary generation failed:",
        errorText,
      );

      throw new Error(
        `FastAPI request failed with status ${response.status}`,
      );
    }

    // Read FastAPI response
    const data = await response.json();

    // FastAPI currently returns travel_plan as a JSON string
    let travelPlan: TravelPlanOutput;

    try {
      travelPlan =
        typeof data.travel_plan === "string"
          ? JSON.parse(data.travel_plan)
          : data.travel_plan;
    } catch (error) {
      console.error(
        "Failed to parse FastAPI travel_plan:",
        error,
      );

      throw new Error(
        "FastAPI returned an invalid travel plan",
      );
    }

    // Return the normalized AI provider response
    return {
      success: data.success,
      message: data.message,
      travelPlan,
    };
  }
}

// Export one provider instance
export const fastAPIProvider = new FastAPIProvider();