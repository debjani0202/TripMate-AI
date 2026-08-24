import type { TravelPlan } from "@/types/travel";

export const mockTravelPlan: TravelPlan = {
  trip_summary: {
    destination: "TEST RAJASTHAN",
    start_date: "2026-09-14",
    end_date: "2026-09-19",
    duration_days: 6,
    travelers: 2,
    budget: 99999,
    currency: "INR",
    travel_style: "TEST COMFORT",
  },

  selected_cities: [
    {
      city: "TEST JAIPUR",
      why_visit: "TEST JAIPUR REASON",
      days_allocated: 2,
    },
    {
      city: "TEST JODHPUR",
      why_visit: "TEST JODHPUR REASON",
      days_allocated: 2,
    },
    {
      city: "TEST UDAIPUR",
      why_visit: "TEST UDAIPUR REASON",
      days_allocated: 2,
    },
  ],

  itinerary: [
    {
      day: 1,
      date: "2026-09-14",
      city: "TEST JAIPUR",

      morning: "TEST RAJASTHAN MORNING",

      afternoon: "TEST RAJASTHAN AFTERNOON",

      evening: "TEST RAJASTHAN EVENING",

      meals: {
        breakfast: "TEST RAJASTHAN BREAKFAST",
        lunch: "TEST RAJASTHAN LUNCH",
        dinner: "TEST RAJASTHAN DINNER",
      },

      transport: "TEST RAJASTHAN TRANSPORT",

      hotel: "TEST RAJASTHAN HOTEL",

      estimated_daily_cost: 9999,

      tips: [
        "TEST RAJASTHAN TIP 1",
        "TEST RAJASTHAN TIP 2",
      ],
    },

    {
      day: 2,
      date: "2026-09-15",
      city: "TEST JODHPUR",

      morning: "TEST DAY 2 MORNING",

      afternoon: "TEST DAY 2 AFTERNOON",

      evening: "TEST DAY 2 EVENING",

      meals: {
        breakfast: "TEST DAY 2 BREAKFAST",
        lunch: "TEST DAY 2 LUNCH",
        dinner: "TEST DAY 2 DINNER",
      },

      transport: "TEST DAY 2 TRANSPORT",

      hotel: "TEST DAY 2 HOTEL",

      estimated_daily_cost: 8888,

      tips: [
        "TEST DAY 2 TIP",
      ],
    },

    {
      day: 3,
      date: "2026-09-16",
      city: "TEST UDAIPUR",

      morning: "TEST DAY 3 MORNING",

      afternoon: "TEST DAY 3 AFTERNOON",

      evening: "TEST DAY 3 EVENING",

      meals: {
        breakfast: "TEST DAY 3 BREAKFAST",
        lunch: "TEST DAY 3 LUNCH",
        dinner: "TEST DAY 3 DINNER",
      },

      transport: "TEST DAY 3 TRANSPORT",

      hotel: "TEST DAY 3 HOTEL",

      estimated_daily_cost: 7777,

      tips: [
        "TEST DAY 3 TIP",
      ],
    },
  ],

  weather: {
    overall_summary: "TEST WEATHER SUMMARY",

    cities: [
      {
        city: "TEST JAIPUR",
        temperature: "99°C",
        conditions: "TEST SUNNY",
        travel_advisory: "TEST WEATHER ADVISORY",
      },
      {
        city: "TEST JODHPUR",
        temperature: "88°C",
        conditions: "TEST CLOUDY",
        travel_advisory: "TEST JODHPUR ADVISORY",
      },
      {
        city: "TEST UDAIPUR",
        temperature: "77°C",
        conditions: "TEST RAINY",
        travel_advisory: "TEST UDAIPUR ADVISORY",
      },
    ],
  },

  transport: {
    recommended_mode: "TEST RECOMMENDED TRANSPORT",

    provider: "TEST TRANSPORT PROVIDER",

    estimated_cost: "₹9999",

    booking_link: "",

    alternative_options: [
      {
        mode: "TEST TRAIN",
        provider: "TEST TRAIN PROVIDER",
        estimated_cost: "₹1111",
        booking_link: "",
      },
      {
        mode: "TEST BUS",
        provider: "TEST BUS PROVIDER",
        estimated_cost: "₹2222",
        booking_link: "",
      },
    ],
  },

  accommodation: [
    {
      city: "TEST JAIPUR",
      hotel_name: "TEST JAIPUR HOTEL",
      price_per_night: "₹9999",
      rating: "9.9/10",
      booking_link: "",
      why_recommended: "TEST JAIPUR HOTEL REASON",
    },
    {
      city: "TEST JODHPUR",
      hotel_name: "TEST JODHPUR HOTEL",
      price_per_night: "₹8888",
      rating: "8.8/10",
      booking_link: "",
      why_recommended: "TEST JODHPUR HOTEL REASON",
    },
    {
      city: "TEST UDAIPUR",
      hotel_name: "TEST UDAIPUR HOTEL",
      price_per_night: "₹7777",
      rating: "7.7/10",
      booking_link: "",
      why_recommended: "TEST UDAIPUR HOTEL REASON",
    },
  ],

  restaurants: [
    {
      city: "TEST JAIPUR",
      recommended: [
        {
          name: "TEST JAIPUR RESTAURANT",
          cuisine: "TEST RAJASTHANI CUISINE",
          price_level: "TEST ₹₹",
          must_try: "TEST DAL BAATI",
        },
      ],
    },
    {
      city: "TEST JODHPUR",
      recommended: [
        {
          name: "TEST JODHPUR RESTAURANT",
          cuisine: "TEST MARWARI CUISINE",
          price_level: "TEST ₹₹₹",
          must_try: "TEST LASSI",
        },
      ],
    },
    {
      city: "TEST UDAIPUR",
      recommended: [
        {
          name: "TEST UDAIPUR RESTAURANT",
          cuisine: "TEST INDIAN CUISINE",
          price_level: "TEST ₹₹",
          must_try: "TEST THALI",
        },
      ],
    },
  ],

  budget: {
    total_budget: 99999,

    estimated_cost: 55555,

    remaining: 44444,

    currency: "INR",

    status: "TEST WITHIN BUDGET",

    breakdown: {
      transport: 11111,
      accommodation: 22222,
      food: 3333,
      activities: 4444,
      miscellaneous: 5555,
    },
  },

  packing: {
    clothing: [
      "TEST CLOTHING",
      "TEST JACKET",
    ],

    footwear: [
      "TEST SHOES",
      "TEST SANDALS",
    ],

    electronics: [
      "TEST PHONE",
      "TEST POWER BANK",
    ],

    documents: [
      "TEST PASSPORT",
      "TEST ID",
    ],

    toiletries: [
      "TEST TOOTHBRUSH",
      "TEST SUNSCREEN",
    ],

    health: [
      "TEST MEDICINE",
    ],

    miscellaneous: [
      "TEST WATER BOTTLE",
      "TEST BACKPACK",
    ],
  },

  important_notes: [
    "TEST IMPORTANT NOTE 1",
    "TEST IMPORTANT NOTE 2",
  ],

  limitations: [
    "TEST LIMITATION 1",
    "TEST LIMITATION 2",
  ],
};