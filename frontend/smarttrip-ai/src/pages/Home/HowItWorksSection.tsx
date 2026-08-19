import { motion } from "framer-motion";
import { BookmarkCheck, MessageSquareText, Search, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageSquareText,
    title: "Tell SmartTrip about your trip",
    description: "Share your destination, dates, budget, and the kind of trip you want.",
  },
  {
    number: "02",
    icon: Search,
    title: "AI agents research and analyze",
    description: "Eight specialist agents work in parallel on routes, stays, food, weather, and budget.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "AI builds your itinerary",
    description: "The Final Planner combines every agent's work into one day-by-day plan.",
  },
  {
    number: "04",
    icon: BookmarkCheck,
    title: "Review, save and refine",
    description: "Explore the plan, ask for changes, and save it once it's right.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="container py-16 md:py-24">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">How SmartTrip works</h2>
        <p className="mt-3 text-muted-foreground">From idea to itinerary in four steps.</p>
      </div>

      <div className="relative mt-12">
        <div
          className="absolute left-0 right-0 top-6 hidden h-px border-t-2 border-dashed border-border lg:block"
          aria-hidden="true"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary shadow-sm">
                <step.icon className="h-5 w-5" />
              </div>
              <span className="mt-3 block font-display text-sm font-semibold text-primary/50">
                {step.number}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
