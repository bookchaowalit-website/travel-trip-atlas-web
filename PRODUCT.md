# Trip Atlas — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `travel-planner`, evidence Prototype) on
> 2026-10-23.

## What it is

A client-only itinerary desk over three synthetic routes, with no booking or map API.

## Who it is for

A solo traveller sketching a short trip, or a portfolio visitor who wants to see a calm route-first planning UI.

## What works today

1. Route index: choose one of three synthetic routes; the sheet shows its code, name, mood, nights and a THB budget.
2. Day rail: pick DAY 01–03 to read that stop's note, or press "Mark next stop" to step forward; at the last stop the
   button reads "Route complete" and is disabled. Choosing another route starts it at day one.
3. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- Routes, stops and budgets are synthetic: no booking, live prices, maps, transport times or travel advisories.
- No route editing or creation, no account, storage or sync; nothing survives a reload. No API route.

## Live URL and deploy state

- Live: https://travel.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-trip-atlas-frontend` is linked to this repository
  (`bookchaowalit-website/travel-trip-atlas-web`, branch `main`), so each push to `main` deploys to production.
  Last production deploy before this work: 2026-10-23, commit f9f2bc9 (Git, READY).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `travel-trip-atlas-web`, org `personal-yu0`).

## Boundaries

- Browser-only, no server data. The only outbound call is a Sentry error report, when the DSN is set.
