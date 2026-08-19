const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/PlanTrip.jsx', 'utf8');

content = content.replace(/response\.data\?\.daysPlan\?\.length/g, 'response.data?.days?.length');

content = content.replace(
  /if\s*\(response\.data\?\.days\?\.length\)\s*\{/,
  'if (response.data?.days?.length) {\n        localStorage.setItem("trip", JSON.stringify(response.data));\n'
);

content = content.replace(
  /setTimeout\(\(\)\s*=>\s*\{\s*navigate\("\/itinerary",\s*\{\s*state:\s*\{\s*trip:\s*fallbackTrip\s*\}\s*\}\);\s*\},\s*1500\);/g,
  `setTimeout(() => {\n        localStorage.setItem("trip", JSON.stringify(fallbackTrip));\n        navigate("/itinerary", {\n          state: { trip: fallbackTrip }\n        });\n      }, 1500);`
);

const fallbackRegex = /daysPlan:\s*Array\.from\(\{[\s\S]*?\}\)\)\s*\}/;
const newFallback = `city: destination || "Demo City",
        destination: destination || "Demo Trip",
        daysCount: Number(days) || 3,
        days: Array.from({ length: Number(days) || 3 }, (_, index) => ({
          day: index + 1,
          title: index === 0 ? "Arrival and First Look" : \`Explore Day \${index + 1}\`,
          activities: [
            {
              time: "10:00 AM",
              place: index === 0 ? \`Hotel Check-in, \${destination || "Demo City"}\` : \`Local Highlight, \${destination || "Demo City"}\`,
              type: "activity",
              description: index === 0
                ? "Arrive, check in, and settle into your accommodation."
                : "Visit a popular local attraction and keep the schedule flexible."
            },
            {
              time: "1:00 PM",
              place: \`Local Restaurant, \${destination || "Demo City"}\`,
              type: "restaurant",
              description: "Try a nearby restaurant and sample food connected to the destination."
            },
            {
              time: "5:00 PM",
              place: \`Scenic Area, \${destination || "Demo City"}\`,
              type: "attraction",
              description: "Explore a scenic area, market, or viewpoint at an easy pace."
            }
          ]
        }))
      }`;

content = content.replace(fallbackRegex, newFallback);

fs.writeFileSync('frontend/src/pages/PlanTrip.jsx', content);
