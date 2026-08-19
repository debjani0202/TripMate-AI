import type {
  AIItineraryRequest,
  AIItineraryResponse,
  AIProvider,
  AIItineraryDay,
  TravelPlanOutput,
} from "./ai.provider.js";

const addDays = (dateString: string, days: number): string => {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0];
};

const createItineraryDay = (
  input: AIItineraryRequest,
  dayNumber: number,
): AIItineraryDay => {
  const date = addDays(
    input.start_date,
    dayNumber - 1,
  );

  const interests =
    input.interests.length > 0
      ? input.interests.join(", ")
      : "local culture and sightseeing";

  return {
    day: dayNumber,
    date,
    city: input.destination,

    morning: `Start the day with breakfast and explore ${input.destination}. Focus on ${interests}.`,

    afternoon: `Continue exploring the best attractions and local experiences in ${input.destination}. Keep the activities suitable for your ${input.travelers} traveler(s) and ${input.travel_style.toLowerCase()} travel style.`,

    evening: `Enjoy a relaxed evening in ${input.destination}, try local food, and return to your accommodation.`,

    meals: {
      breakfast: `Breakfast near your accommodation in ${input.destination}.`,
      lunch: `Local ${input.food_preference.toLowerCase()} lunch in ${input.destination}.`,
      dinner: `Dinner featuring local specialties in ${input.destination}.`,
    },

    transport:
      input.transport_mode ||
      "Local transport based on convenience and availability.",

    hotel: `${input.hotel_preference} accommodation in ${input.destination}.`,

    estimated_daily_cost: Math.round(
      input.budget / Math.max(input.days, 1),
    ),

    tips: [
      "Keep enough time between activities.",
      "Carry water and essential travel documents.",
      "Check local opening hours before visiting attractions.",
    ],
  };
};

export class MockAIProvider implements AIProvider {
  async generateItinerary(
    input: AIItineraryRequest,
  ): Promise<AIItineraryResponse> {
    // The requested number of days is the single source of truth.
    const requestedDays = Math.max(
      1,
      Math.floor(input.days),
    );

    const itinerary: AIItineraryDay[] = [];

    for (
      let day = 1;
      day <= requestedDays;
      day++
    ) {
      itinerary.push(
        createItineraryDay(input, day),
      );
    }

    const dailyBudget =
      input.budget / requestedDays;

    const travelPlan: TravelPlanOutput = {
      trip_summary: {
        destination: input.destination,
        start_date: input.start_date,
        end_date: input.end_date,
        duration_days: requestedDays,
        travelers: input.travelers,
        budget: input.budget,
        currency: input.currency,
        travel_style: input.travel_style,
      },

      selected_cities: [
        {
          city: input.destination,
          why_visit: `A destination selected for your ${input.travel_style.toLowerCase()} trip.`,
          days_allocated: requestedDays,
        },
      ],

      itinerary,

      weather: {
        overall_summary:
          `Check the latest local weather before travelling to ${input.destination}.`,
        cities: [
          {
            city: input.destination,
            temperature: "Check current forecast",
            conditions: "Weather information will be updated when live weather data is connected.",
            travel_advisory:
              "Check official local travel advisories before departure.",
          },
        ],
      },

      transport: {
        recommended_mode:
          input.transport_mode ||
          "Local transport",
        provider: "Local transport providers",
        estimated_cost: `${Math.round(dailyBudget * 0.1)} ${input.currency} per day`,
        booking_link: "",
        alternative_options: [],
      },

      accommodation: [
        {
          city: input.destination,
          hotel_name:
            `${input.hotel_preference} accommodation`,
          price_per_night:
            `${Math.round(dailyBudget * 0.25)} ${input.currency}`,
          rating: "Recommended based on preference",
          booking_link: "",
          why_recommended:
            `Matches the selected ${input.hotel_preference} preference.`,
        },
      ],

      restaurants: [
        {
          city: input.destination,
          recommended: [
            {
              name: "Local Restaurant",
              cuisine: input.food_preference,
              price_level: "Moderate",
              must_try:
                "Try a local specialty.",
            },
          ],
        },
      ],

      budget: {
        total_budget: input.budget,
        estimated_cost: input.budget,
        remaining: 0,
        currency: input.currency,
        status: "Planned",
        breakdown: {
          transport: Math.round(
            input.budget * 0.1,
          ),
          accommodation: Math.round(
            input.budget * 0.3,
          ),
          food: Math.round(
            input.budget * 0.2,
          ),
          activities: Math.round(
            input.budget * 0.3,
          ),
          miscellaneous: Math.round(
            input.budget * 0.1,
          ),
        },
      },

      packing: {
        clothing: [
          "Comfortable clothes",
          "Weather-appropriate clothing",
        ],
        footwear: [
          "Comfortable walking shoes",
        ],
        electronics: [
          "Phone",
          "Charger",
          "Power bank",
        ],
        documents: [
          "Government ID",
          "Booking confirmations",
        ],
        toiletries: [
          "Toothbrush",
          "Toothpaste",
          "Personal toiletries",
        ],
        health: [
          "Basic medicines",
          "Hand sanitizer",
        ],
        miscellaneous: [
          "Water bottle",
          "Small day bag",
        ],
      },

      important_notes: [
        `This itinerary contains exactly ${requestedDays} day(s) based on your trip duration.`,
        `Plan is designed for ${input.travelers} traveler(s).`,
        "Verify opening hours and local conditions before visiting attractions.",
      ],

      limitations: [
        "Live weather, booking availability, and real-time pricing are not connected yet.",
      ],
    };

    return {
      success: true,
      message: `Itinerary generated successfully for ${requestedDays} day(s).`,
      travelPlan,
    };
  }
}

export const mockAIProvider =
  new MockAIProvider();