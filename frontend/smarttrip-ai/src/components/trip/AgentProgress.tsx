import {
  Check,
  Circle,
  Loader2,
  X,
} from "lucide-react";

export type AgentStatus =
  | "waiting"
  | "running"
  | "completed"
  | "failed";

export interface AgentProgressItem {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
}

interface AgentProgressProps {
  agents: AgentProgressItem[];
}

// Show the correct icon for each agent status.
function StatusIcon({ status }: { status: AgentStatus }) {
  if (status === "completed") {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
        <Check className="h-3.5 w-3.5" />
      </div>
    );
  }

  if (status === "running") {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-accent dark:bg-orange-950/40">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
        <X className="h-3.5 w-3.5" />
      </div>
    );
  }

  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground dark:bg-[#252932]">
      <Circle className="h-3 w-3" />
    </div>
  );
}

export function AgentProgress({
  agents,
}: AgentProgressProps) {
  // Calculate how many agents have finished.
  const completedCount = agents.filter(
    (agent) => agent.status === "completed",
  ).length;

  const progress =
    agents.length > 0
      ? Math.round(
          (completedCount / agents.length) * 100,
        )
      : 0;

  return (
    <section className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-[#191c22]">

      {/* Workflow heading */}

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <div className="flex items-center gap-1.5">

            <span className="text-sm text-accent">
              ✦
            </span>

            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
              SmartTrip AI
            </p>

          </div>

          <h2 className="mt-0.5 text-base font-semibold text-foreground">
            AI agents
          </h2>

          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Building your personalized trip
          </p>

        </div>


        {/* Progress percentage */}

        <div className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-accent dark:bg-orange-950/40">
          {progress}%
        </div>

      </div>


      {/* Progress bar */}

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary dark:bg-[#252932]">

        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>


      {/* Agent list */}

      <div className="mt-3">

        {agents.map((agent, index) => (

          <div
            key={agent.id}
            className="relative flex gap-2.5 py-2"
          >

            {/* Connect agents */}

            {index < agents.length - 1 && (
              <div className="absolute left-[12px] top-[30px] h-[calc(100%-10px)] w-px bg-border" />
            )}

            <StatusIcon status={agent.status} />

            <div className="min-w-0 flex-1">

              <div className="flex items-center justify-between gap-2">

                <p
                  className={`text-xs font-semibold ${
                    agent.status === "running"
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                >
                  {agent.name}
                </p>

                <span
                  className={`shrink-0 text-[8px] font-medium uppercase ${
                    agent.status === "completed"
                      ? "text-green-600 dark:text-green-400"
                      : agent.status === "running"
                        ? "text-accent"
                        : agent.status === "failed"
                          ? "text-red-600 dark:text-red-400"
                          : "text-muted-foreground"
                  }`}
                >
                  {agent.status}
                </span>

              </div>

              <p className="mt-0.5 text-[10px] leading-3.5 text-muted-foreground">
                {agent.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}