import {
  Briefcase,
  Check,
  FileText,
  HeartPulse,
  Laptop,
  Shirt,
  ShowerHead,
  Sparkles,
  Footprints,
} from "lucide-react";

import type { PackingList } from "@/types/travel";

interface PackingSectionProps {
  packing: PackingList;
}

// Packing categories and their icons.
const categories = [
  {
    key: "clothing",
    title: "Clothing",
    icon: Shirt,
  },
  {
    key: "footwear",
    title: "Footwear",
    icon: Footprints,
  },
  {
    key: "electronics",
    title: "Electronics",
    icon: Laptop,
  },
  {
    key: "documents",
    title: "Documents",
    icon: FileText,
  },
  {
    key: "toiletries",
    title: "Toiletries",
    icon: ShowerHead,
  },
  {
    key: "health",
    title: "Health",
    icon: HeartPulse,
  },
  {
    key: "miscellaneous",
    title: "Miscellaneous",
    icon: Briefcase,
  },
] as const;

export function PackingSection({
  packing,
}: PackingSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-[#191c22] sm:p-6">

      {/* Section heading */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
          Before you go
        </p>

        <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
          Packing list
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Smart packing suggestions based on your planned journey.
        </p>
      </div>


      {/* Packing categories */}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => {

          const Icon = category.icon;
          const items = packing[category.key];

          return (
            <div
              key={category.key}
              className="rounded-2xl border border-border p-4"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-accent dark:bg-orange-950/40">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="text-sm font-semibold text-foreground">
                  {category.title}
                </h3>

              </div>


              {/* Items to pack */}

              <ul className="mt-4 space-y-2">

                {items.map((item, index) => (

                  <li
                    key={`${category.key}-${index}`}
                    className="flex items-start gap-2"
                  >

                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" />

                    <span className="text-xs leading-5 text-muted-foreground">
                      {item}
                    </span>

                  </li>

                ))}

              </ul>

            </div>
          );
        })}

      </div>


      {/* Packing tip */}

      <div className="mt-5 flex gap-3 rounded-xl bg-secondary/50 p-4 dark:bg-[#252932]">

        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />

        <div>

          <p className="text-xs font-semibold text-foreground">
            Smart packing tip
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Pack according to the weather and activities in your itinerary,
            and keep important documents and medicines easily accessible.
          </p>

        </div>

      </div>

    </section>
  );
}