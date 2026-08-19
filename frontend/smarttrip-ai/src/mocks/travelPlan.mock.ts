import type { TravelPlan } from "@/types/travel";

export const mockTravelPlan: TravelPlan = {
  trip_summary: {
    destination: "Rajasthan, India",
    start_date: "2026-09-14",
    end_date: "2026-09-19",
    duration_days: 6,
    travelers: 2,
    budget: 50000,
    currency: "INR",
    travel_style: "Comfort",
  },

  selected_cities: [
    {
      city: "Jaipur",
      why_visit: "Historic forts, palaces, markets and local culture.",
      days_allocated: 2,
    },
    {
      city: "Jodhpur",
      why_visit: "Mehrangarh Fort, blue streets and Marwari culture.",
      days_allocated: 2,
    },
    {
      city: "Udaipur",
      why_visit: "Lakes, palaces and relaxed scenic experiences.",
      days_allocated: 2,
    },
  ],

  itinerary: [
    {
      day: 1,
      date: "2026-09-14",
      city: "Jaipur",
      morning: "Arrive in Jaipur and check into the hotel.",
      afternoon: "Explore City Palace and Jantar Mantar.",
      evening: "Visit Hawa Mahal and explore the nearby market.",
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Local Rajasthani thali",
        dinner: "Traditional Rajasthani dinner",
      },
      transport: "Airport transfer and local cab",
      hotel: "Comfort hotel in central Jaipur",
      estimated_daily_cost: 8500,
      tips: [
        "Start sightseeing early.",
        "Carry water during outdoor visits.",
      ],
    },
    {
      day: 2,
      date: "2026-09-15",
      city: "Jaipur",
      morning: "Visit Amber Fort.",
      afternoon: "Explore Jal Mahal and local handicraft markets.",
      evening: "Enjoy a cultural evening with traditional performances.",
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Local vegetarian restaurant",
        dinner: "Rajasthani cuisine",
      },
      transport: "Private cab",
      hotel: "Comfort hotel in central Jaipur",
      estimated_daily_cost: 8000,
      tips: [
        "Wear comfortable shoes.",
        "Keep some cash for local markets.",
      ],
    },
    {
      day: 3,
      date: "2026-09-16",
      city: "Jodhpur",
      morning: "Travel from Jaipur to Jodhpur.",
      afternoon: "Check in and explore the Blue City.",
      evening: "Watch sunset from a rooftop viewpoint.",
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Restaurant near the old city",
        dinner: "Local Marwari cuisine",
      },
      transport: "Intercity train",
      hotel: "Heritage hotel in Jodhpur",
      estimated_daily_cost: 9000,
      tips: [
        "Keep luggage light during city exploration.",
      ],
    },
    {
      day: 4,
      date: "2026-09-17",
      city: "Jodhpur",
      morning: "Explore Mehrangarh Fort.",
      afternoon: "Visit Jaswant Thada and local markets.",
      evening: "Relax at a rooftop restaurant.",
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Local restaurant",
        dinner: "Rooftop dinner",
      },
      transport: "Local cab",
      hotel: "Heritage hotel in Jodhpur",
      estimated_daily_cost: 8500,
      tips: [
        "Carry sun protection.",
        "Allow enough time for Mehrangarh Fort.",
      ],
    },
    {
      day: 5,
      date: "2026-09-18",
      city: "Udaipur",
      morning: "Travel to Udaipur.",
      afternoon: "Visit City Palace.",
      evening: "Enjoy a sunset boat ride on Lake Pichola.",
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Restaurant near City Palace",
        dinner: "Lake-view restaurant",
      },
      transport: "Private cab",
      hotel: "Lake-area hotel in Udaipur",
      estimated_daily_cost: 9500,
      tips: [
        "Reserve the boat ride in advance.",
      ],
    },
    {
      day: 6,
      date: "2026-09-19",
      city: "Udaipur",
      morning: "Explore Jagdish Temple and nearby streets.",
      afternoon: "Free time for shopping and cafés.",
      evening: "Departure from Udaipur.",
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Local restaurant",
        dinner: "As convenient before departure",
      },
      transport: "Airport transfer",
      hotel: "Check-out",
      estimated_daily_cost: 6500,
      tips: [
        "Keep departure documents easily accessible.",
      ],
    },
  ],

  weather: {
    overall_summary:
      "Warm days with generally suitable conditions for sightseeing.",
    cities: [
      {
        city: "Jaipur",
        temperature: "28°C",
        conditions: "Sunny",
        travel_advisory: "Stay hydrated during afternoon sightseeing.",
      },
      {
        city: "Jodhpur",
        temperature: "29°C",
        conditions: "Mostly sunny",
        travel_advisory: "Use sun protection.",
      },
      {
        city: "Udaipur",
        temperature: "27°C",
        conditions: "Partly cloudy",
        travel_advisory: "Evenings may feel cooler near the lake.",
      },
    ],
  },

  transport: {
    recommended_mode: "Private cab",
    provider: "Local travel provider",
    estimated_cost: "₹12,000",
    booking_link: "",
    alternative_options: [
      {
        mode: "Train",
        provider: "Indian Railways",
        estimated_cost: "₹3,500",
        booking_link: "",
      },
      {
        mode: "Bus",
        provider: "Private bus operator",
        estimated_cost: "₹2,800",
        booking_link: "",
      },
    ],
  },

  accommodation: [
    {
      city: "Jaipur",
      hotel_name: "Jaipur Heritage Stay",
      price_per_night: "₹3,500",
      rating: "4.3/5",
      booking_link: "",
      why_recommended: "Central location and convenient access to attractions.",
    },
    {
      city: "Jodhpur",
      hotel_name: "Blue City Heritage Hotel",
      price_per_night: "₹4,000",
      rating: "4.4/5",
      booking_link: "",
      why_recommended: "Good location for exploring the old city.",
    },
    {
      city: "Udaipur",
      hotel_name: "Lake View Retreat",
      price_per_night: "₹4,500",
      rating: "4.5/5",
      booking_link: "",
      why_recommended: "Scenic location close to Lake Pichola.",
    },
  ],

  restaurants: [
    {
      city: "Jaipur",
      recommended: [
        {
          name: "Rajasthani Kitchen",
          cuisine: "Rajasthani",
          price_level: "₹₹",
          must_try: "Dal Baati Churma",
        },
        {
          name: "Pink City Café",
          cuisine: "Indian",
          price_level: "₹₹",
          must_try: "Local thali",
        },
      ],
    },
    {
      city: "Jodhpur",
      recommended: [
        {
          name: "Marwari Table",
          cuisine: "Marwari",
          price_level: "₹₹",
          must_try: "Makhaniya lassi and local thali",
        },
      ],
    },
    {
      city: "Udaipur",
      recommended: [
        {
          name: "Lake View Dining",
          cuisine: "Indian",
          price_level: "₹₹₹",
          must_try: "Rajasthani specialities",
        },
      ],
    },
  ],

  budget: {
    total_budget: 50000,
    estimated_cost: 44500,
    remaining: 5500,
    currency: "INR",
    status: "Within budget",
    breakdown: {
      transport: 12000,
      accommodation: 15000,
      food: 7500,
      activities: 7000,
      miscellaneous: 3000,
    },
  },

  packing: {
    clothing: [
      "Lightweight clothes",
      "Comfortable walking clothes",
      "Light jacket",
    ],
    footwear: [
      "Comfortable walking shoes",
      "Sandals",
    ],
    electronics: [
      "Phone charger",
      "Power bank",
      "Travel adapter",
    ],
    documents: [
      "Government ID",
      "Hotel confirmations",
      "Travel tickets",
    ],
    toiletries: [
      "Toothbrush",
      "Toothpaste",
      "Sunscreen",
    ],
    health: [
      "Basic medicines",
      "Personal medication",
    ],
    miscellaneous: [
      "Water bottle",
      "Small backpack",
      "Sunglasses",
    ],
  },

  important_notes: [
    "Keep copies of important travel documents.",
    "Carry sufficient drinking water during sightseeing.",
  ],

  limitations: [
    "Prices are estimates and may change.",
    "Availability should be confirmed before booking.",
  ],
};