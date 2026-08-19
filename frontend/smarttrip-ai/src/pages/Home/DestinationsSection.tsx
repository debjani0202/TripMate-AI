import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { DESTINATIONS } from "@/data/destinations";
import { Photo } from "@/components/travel/Photo";

const MotionLink = motion(Link);

export function DestinationsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container flex items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Popular destinations
          </h2>
          <p className="mt-3 text-muted-foreground">
            A few places SmartTrip AI travelers are planning trips to right
            now.
          </p>
        </div>
      </div>

      <div className="container mt-10">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {DESTINATIONS.map((destination, index) => (
            <MotionLink
              key={destination.location}
              to="/plan-trip"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              className="group relative aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-lg sm:w-64"
            >
              <Photo
                src={destination.image}
                alt={destination.alt}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 text-white">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/75">
                    {destination.country}
                  </p>
                  <p className="mt-0.5 font-display text-lg font-semibold">
                    {destination.location}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
