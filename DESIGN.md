# Trip Atlas — design

Since 2026-11-19 the desk uses the shared **Reader shell** (`app/reader-shell.css`,
`components/reader-shell.tsx`, rules in `READER.md`): Geist via next/font (with the shell's Thai
fallback stack), the `--rs-*` light and dark tokens, one top bar and a footer back to bookchaowalit.com.

- Home: a short page head, a count line, then one row per route (nights and budget, the stops in order,
  code and mood tags) — the routes show in the first screen on phones.
- Route page (`/routes/[id]`): back link, tags, nights / budget / stops in the meta line, every day of the
  route as an ordered list, then previous/next route. All days show at once, so there is no selected-tab
  state to announce and no "Mark next stop" button.
- Floor: text ≥ 12px, targets ≥ 44px, 4.5:1 text in light and dark, forced colors.

Routes, stops and budgets are illustrative and written in `lib/trip-atlas.ts`; nothing is fetched or booked.
