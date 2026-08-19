import { motion } from "framer-motion";

import { AGENT_TEAM } from "@/data/agents";

export function AgentTeamSection() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <div className="container">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Meet your AI travel team
          </h2>
          <p className="mt-3 text-muted-foreground">
            Eight specialist agents research, plan, and cross-check every
            part of your trip — then hand it all to the Final Planner.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px border-t-2 border-dashed border-border sm:block"
            aria-hidden="true"
          />

          <div className="flex gap-8 overflow-x-auto pb-2 sm:justify-between sm:gap-4 sm:overflow-visible">
            {AGENT_TEAM.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex w-28 shrink-0 flex-col items-center text-center sm:w-auto sm:flex-1"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary shadow-sm">
                  <agent.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium">{agent.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{agent.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
