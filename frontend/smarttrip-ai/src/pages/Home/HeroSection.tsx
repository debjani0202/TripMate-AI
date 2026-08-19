import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DestinationShowcase } from "@/components/travel/DestinationShowcase";

const TRUST_STRIP = [
  "8 specialist AI agents",
  "Personalized in minutes",
  "Built for every travel style",
];

export function HeroSection() {
  return (
    <section className="container grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1fr_0.85fr] lg:gap-14 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          Agentic AI travel planning
        </span>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Plan your perfect trip.
          <br />
          Let <span className="text-accent">AI</span> handle the details.
        </h1>

        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          SmartTrip AI builds practical, personalized itineraries with a
          team of specialist agents — research, weather, stays, dining,
          transport, budget and packing — working together on one trip:
          yours.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" variant="accent" asChild>
            <Link to="/plan-trip">
              Plan My Trip
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#how-it-works">How It Works</a>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
          {TRUST_STRIP.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto w-full max-w-sm lg:max-w-none"
      >
        <DestinationShowcase />
      </motion.div>
    </section>
  );
}

