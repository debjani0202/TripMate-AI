import { Camera, ClipboardList, ShieldCheck, Sparkles } from "lucide-react";

import { FeatureCard } from "@/components/common/FeatureCard";

const PRIMARY_FEATURE = {
  icon: ClipboardList,
  iconClassName: "bg-primary/10 text-primary",
  title: "AI Itinerary Planner",
  description:
    "Generate a personalized day-by-day travel plan — routes, stays, meals, and budget worked out by a team of specialist agents.",
  ctaLabel: "Plan My Trip",
  to: "/plan-trip",
  featured: true,
};

const SUPPORTING_FEATURES = [
  {
    icon: Camera,
    iconClassName: "bg-primary/10 text-primary",
    title: "Discover by Photo",
    description: "Upload a photo of a place and find out what it is and how to visit.",
    ctaLabel: "Discover",
    to: "/discover",
  },
  {
    icon: ShieldCheck,
    iconClassName: "bg-status-completed/10 text-status-completed",
    title: "Travel Safety Analyzer",
    description: "Check advisories, risk levels, and precautions for any destination.",
    ctaLabel: "Check Safety",
    to: "/safety",
  },
  {
    icon: Sparkles,
    iconClassName: "bg-accent/10 text-accent",
    title: "AI Travel Recommendations",
    description: "Get destination and activity ideas based on your interests and style.",
    ctaLabel: "Get Recommendations",
    to: "/recommendations",
  },
];

export function FeaturesSection() {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Everything you need to plan a trip
        </h2>
        <p className="mt-3 text-muted-foreground">
          Four tools, one connected experience — from the first idea to the
          finished itinerary.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <FeatureCard {...PRIMARY_FEATURE} />

        <div className="divide-y divide-border rounded-lg border border-border">
          {SUPPORTING_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} layout="row" {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
