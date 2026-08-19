import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center gap-5 overflow-hidden rounded-lg border border-border bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12"
      >
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />

        <h2 className="relative font-display text-3xl font-semibold sm:text-4xl">
          Your next journey starts here.
        </h2>
        <p className="relative max-w-md text-primary-foreground/80">
          Answer a few questions and let your AI travel team work out the
          details.
        </p>
        <Button size="lg" variant="accent" asChild className="relative">
          <Link to="/plan-trip">
            Plan My Trip
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
