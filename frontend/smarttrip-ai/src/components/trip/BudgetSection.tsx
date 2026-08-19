import {
  Activity,
  BedDouble,
  Car,
  CircleDollarSign,
  Coffee,
  MoreHorizontal,
  Wallet,
} from "lucide-react";

import type { BudgetSummary } from "@/types/travel";

interface BudgetSectionProps {
  budget: BudgetSummary;
}

// Format money using Indian number formatting.
const formatAmount = (
  amount: number,
  currency: string,
) => {
  return `${currency} ${amount.toLocaleString("en-IN")}`;
};

export function BudgetSection({
  budget,
}: BudgetSectionProps) {
  // Create the spending categories.
  const breakdownItems = [
    {
      label: "Transport",
      amount: budget.breakdown.transport,
      icon: Car,
    },
    {
      label: "Accommodation",
      amount: budget.breakdown.accommodation,
      icon: BedDouble,
    },
    {
      label: "Food",
      amount: budget.breakdown.food,
      icon: Coffee,
    },
    {
      label: "Activities",
      amount: budget.breakdown.activities,
      icon: Activity,
    },
    {
      label: "Miscellaneous",
      amount: budget.breakdown.miscellaneous,
      icon: MoreHorizontal,
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:bg-[#191c22] sm:p-6">

      {/* Section heading */}

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
          Trip finances
        </p>

        <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
          Budget
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Estimated spending based on your personalized itinerary.
        </p>
      </div>


      {/* Budget summary */}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">

        {/* Total budget */}

        <div className="rounded-xl bg-secondary/50 p-4 dark:bg-[#252932]">

          <div className="flex items-center gap-2 text-muted-foreground">

            <Wallet className="h-4 w-4" />

            <span className="text-xs font-medium">
              Total budget
            </span>

          </div>

          <p className="mt-2 text-lg font-semibold text-foreground">
            {formatAmount(
              budget.total_budget,
              budget.currency,
            )}
          </p>

        </div>


        {/* Estimated cost */}

        <div className="rounded-xl bg-secondary/50 p-4 dark:bg-[#252932]">

          <div className="flex items-center gap-2 text-muted-foreground">

            <CircleDollarSign className="h-4 w-4" />

            <span className="text-xs font-medium">
              Estimated cost
            </span>

          </div>

          <p className="mt-2 text-lg font-semibold text-foreground">
            {formatAmount(
              budget.estimated_cost,
              budget.currency,
            )}
          </p>

        </div>


        {/* Remaining budget */}

        <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-950/30">

          <div className="flex items-center gap-2 text-accent">

            <Wallet className="h-4 w-4" />

            <span className="text-xs font-medium">
              Remaining
            </span>

          </div>

          <p className="mt-2 text-lg font-semibold text-accent">
            {formatAmount(
              budget.remaining,
              budget.currency,
            )}
          </p>

        </div>

      </div>


      {/* Budget status */}

      <div className="mt-4 flex items-center justify-between rounded-xl border border-border px-4 py-3">

        <span className="text-xs text-muted-foreground">
          Budget status
        </span>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
          {budget.status}
        </span>

      </div>


      {/* Spending breakdown */}

      <div className="mt-6">

        <h3 className="text-sm font-semibold text-foreground">
          Spending breakdown
        </h3>

        <div className="mt-3 space-y-3">

          {breakdownItems.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >

                {/* Category icon */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground dark:bg-[#252932]">
                  <Icon className="h-4 w-4" />
                </div>


                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <span className="text-xs font-medium text-foreground">
                      {item.label}
                    </span>

                    <span className="text-xs font-semibold text-foreground">
                      {formatAmount(
                        item.amount,
                        budget.currency,
                      )}
                    </span>

                  </div>


                  {/* Spending progress */}

                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary dark:bg-[#252932]">

                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(
                          (item.amount /
                            Math.max(
                              budget.estimated_cost,
                              1,
                            )) *
                            100,
                          100,
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}