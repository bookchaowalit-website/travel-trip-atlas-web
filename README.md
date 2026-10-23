# Trip Atlas

A small route-planning desk over three synthetic trips (northern Thailand, the Gulf coast, Singapore). Pick a route
to see its mood, nights and budget, step through its three stops day by day. Sample data only, kept in the code.

Live: https://travel.bookchaowalit.com (Vercel deploys each push to `main`, see `PRODUCT.md`).

## What it does not do

- No booking, maps, prices from a provider, travel advisories or route editing. No account. Nothing is saved.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: route logic, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/trip-atlas.ts`: the three synthetic routes plus `findRoute`, `stopAt`, `nextDay`, `isLastDay` and
  `formatBudget` (fixed en-US grouping, so server and browser render the same text).
- `app/page.tsx`: the client planning desk.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
