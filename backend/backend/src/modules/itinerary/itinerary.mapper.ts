import type {
  AIItineraryDay,
  TravelPlanOutput,
} from "../../providers/ai/ai.provider.js";

import type {
  ItineraryActivity,
} from "./itinerary.types.js";

export interface MappedItineraryDay {
  dayNumber: number;
  title: string;
  activities: ItineraryActivity[];
}

const createActivity = (
  time: string,
  place: string,
  type: string,
  description: string,
): ItineraryActivity => ({
  time,
  place,
  type,
  description,
});

const mapDay = (
  day: AIItineraryDay,
): MappedItineraryDay => {
  const activities: ItineraryActivity[] = [];

  if (day.morning) {
    activities.push(
      createActivity(
        "Morning",
        day.city,
        "Activity",
        day.morning,
      ),
    );
  }

  if (day.afternoon) {
    activities.push(
      createActivity(
        "Afternoon",
        day.city,
        "Activity",
        day.afternoon,
      ),
    );
  }

  if (day.evening) {
    activities.push(
      createActivity(
        "Evening",
        day.city,
        "Activity",
        day.evening,
      ),
    );
  }

  return {
    dayNumber: day.day,
    title: day.city,
    activities,
  };
};

export const mapTravelPlanToItinerary = (
  travelPlan: TravelPlanOutput,
): MappedItineraryDay[] => {
  return travelPlan.itinerary.map(mapDay);
};