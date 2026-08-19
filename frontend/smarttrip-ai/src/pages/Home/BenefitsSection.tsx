import { motion } from "framer-motion";
import { IndianRupee, RefreshCw, ShieldCheck, Users, Wand2, Zap } from "lucide-react";

const BENEFITS = [
  { icon: Wand2, title: "Personalized planning", description: "Every itinerary is built around your interests and pace." },
  { icon: IndianRupee, title: "Budget-aware travel", description: "Recommendations stay within the budget you set." },
  { icon: ShieldCheck, title: "Safety-aware recommendations", description: "Advisories and precautions factored into every plan." },
  { icon: Users, title: "Multiple specialized AI agents", description: "Research, weather, stays, dining, transport, budget and packing — together." },
  { icon: Zap, title: "Less planning effort", description: "Minutes of input instead of hours of research." },
  { icon: RefreshCw, title: "Easy itinerary refinement", description: "Ask for changes and get an updated plan instantly." },
];

export function BenefitsSection() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <div className="container">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Why travelers choose SmartTrip AI
          </h2>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              className="flex items-start gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <benefit.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">{benefit.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
