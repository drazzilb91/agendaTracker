# Copilot Instructions

## Project Overview

AgendaTracker is a React + TypeScript PWA — a meeting agenda clock that tracks progress through timed agenda items. It is hosted on Firebase Hosting (target: `agendaclock`).

**Stack:** React 19, Mantine 9, MUI 9, Vite 8, TypeScript ~6, Vitest, pnpm

## Commands

```bash
pnpm install          # install dependencies
pnpm run dev          # dev server at http://127.0.0.1:5173
pnpm run lint         # ESLint (must pass with 0 warnings)
pnpm run build        # tsc + vite build (prebuild runs tsc -p tsconfig.sw.json first)
pnpm test             # run tests once
pnpm run test:watch   # run tests in watch mode
```

To run a single test file:
```bash
pnpm test src/test/parseAgenda.test.ts
```

## Package Manager

This project uses **pnpm**. Always use `pnpm install`, `pnpm add`, `pnpm remove`. Never generate or commit `package-lock.json` — the lockfile is `pnpm-lock.yaml`.

## CI Gate

All three steps must pass before merging:
1. `pnpm run lint` — ESLint v9 flat config (`eslint.config.js`). There is no `.eslintrc.*` file.
2. `pnpm run build` — includes `prebuild` which compiles `service-worker.ts` via `tsconfig.sw.json`
3. `pnpm test` — Vitest in jsdom environment

## Architecture

- `src/App.tsx` — root component; owns all state (agenda items, timer, progress)
- `src/components/` — AgendaItem (type + display), Footer, ProgressBars, RingProgress, Timeline
- `src/helpers/parseAgenda.ts` — parses colon-delimited text (`name : description : duration`) into `AgendaItem[]`
- `src/test/` — Vitest tests; setup in `setup.ts`
- `service-worker.ts` — hand-rolled service worker, compiled by `tsconfig.sw.json` into `public/service-worker.js`

## Key Conventions

- Agenda input format: each line is `name : description : duration` where duration is minutes (numeric)
- The service worker is **hand-rolled** — `service-worker.ts` compiles via `tsconfig.sw.json` to `public/service-worker.js` as part of `prebuild`. Do not add `vite-plugin-pwa`.
- TypeScript strict mode is on; `noUnusedLocals` and `noUnusedParameters` are enforced.
