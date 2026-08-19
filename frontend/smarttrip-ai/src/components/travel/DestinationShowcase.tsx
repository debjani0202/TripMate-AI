import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, MapPin } from "lucide-react";

import { HERO_DESTINATIONS } from "@/data/destinations";

const SLIDE_DURATION = 5000;

export function DestinationShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_DESTINATIONS.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const active = HERO_DESTINATIONS[activeIndex];
  const imageFailed = failedImages[activeIndex];

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-2xl shadow-xl">
        <AnimatePresence mode="sync">
          {imageFailed ? (
            <motion.div
              key="fallback"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary to-accent/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Camera className="h-8 w-8 text-primary-foreground/50" />
              <p className="text-sm text-primary-foreground/70">{active.country}</p>
            </motion.div>
          ) : (
            <motion.img
              key={active.image}
              src={active.image}
              alt={active.alt}
              onError={() => setFailedImages((prev) => ({ ...prev, [activeIndex]: true }))}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.06 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: SLIDE_DURATION / 1000 + 1, ease: "linear" },
              }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.location}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1.5 text-white"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide text-white/80">{active.country}</span>
            </motion.div>
          </AnimatePresence>
          <p className="mt-1 font-display text-2xl font-semibold text-white">{active.location}</p>
        </div>

        <div className="absolute right-6 top-6 flex gap-1.5">
          {HERO_DESTINATIONS.map((destination, index) => (
            <span
              key={destination.location}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute -bottom-6 -left-6 max-w-[200px] rounded-lg border border-border bg-card px-4 py-3 shadow-lg sm:-left-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-sm font-semibold">5-Day Itinerary</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Planned by 8 AI specialists</p>
      </motion.div>
    </div>
  );
}
