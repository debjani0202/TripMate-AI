# SmartTrip AI — Frontend

AI-powered travel planning frontend. Built with React, TypeScript, Vite,
Tailwind CSS, and shadcn/ui-style components.

## Phase 1 — what's here

- Vite + React + TypeScript project setup, with `@` → `src` path alias
- Tailwind CSS configured with the SmartTrip AI design system (colors,
  fonts, radius, semantic agent-status colors) in `tailwind.config.ts`
  and `src/index.css`
- `components.json` so `npx shadcn add <component>` drops future
  primitives straight into `src/components/ui`
- Light/dark theme support via `ThemeContext`, persisted to
  `localStorage`, toggled from the navbar
- Base layout: `AppShell` (`Navbar` + routed page + `Footer`)
- Routing shell: all 10 top-level routes wired in `src/routes/index.tsx`,
  each currently rendering a lightweight "coming in Phase N" placeholder
- Empty, pre-created folders for the architecture agreed in planning
  (`components/{trip,agents,itinerary,travel}`, `services/{api,mock}`,
  `types`, `schemas`, `hooks`, `data`) — populated phase by phase

Not included yet (later phases): landing page content, trip form,
AI agent workspace, dashboard, mock services, and the rest of the
feature pages.

## Getting started

```bash
npm install
npm run dev
```

This sandbox has no network access to the npm registry, so
`npm install` hasn't been run here — run it locally after downloading
the project.

## Design tokens

| Token | Role |
| --- | --- |
| `--primary` (Voyage Blue) | Brand primary, links, primary actions |
| `--accent` (Amber Route) | CTAs, "running" agent state, highlights |
| `--background` / `--card` | Sand (light) / Ink navy (dark) |
| `--status-*` | Shared pending/running/completed/failed colors for the AI agent workflow |

Fonts: **Fraunces** (display/headings), **Inter** (body/UI), **IBM Plex
Mono** (data — prices, dates, agent/flight codes).
