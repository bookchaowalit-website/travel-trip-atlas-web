// Route data and pure itinerary logic for the Trip Atlas desk.
// Routes, stops and budgets are synthetic, authored in the code; nothing is fetched or booked.

export type Stop = { city: string; time: string; note: string };
export type RoutePlan = { id: string; code: string; name: string; mood: string; nights: string; budget: number; stops: Stop[] };

export const routes: RoutePlan[] = [
  { id: "north", code: "N / 01", name: "Northbound light", mood: "slow / mountain / first train", nights: "3 nights", budget: 7800, stops: [{ city: "Chiang Mai", time: "DAY 01", note: "Arrive before noon; keep the first afternoon unclaimed." }, { city: "Mae Hong Son", time: "DAY 02", note: "Take the long road west and keep one view stop open." }, { city: "Pai", time: "DAY 03", note: "Leave room for a market walk before the return." }] },
  { id: "coast", code: "C / 02", name: "Coastal interval", mood: "salt / shade / one good swim", nights: "4 nights", budget: 10400, stops: [{ city: "Chumphon", time: "DAY 01", note: "Use the pier as the first landmark, not the hotel lobby." }, { city: "Koh Tao", time: "DAY 02", note: "Cross early; keep the afternoon for water and shade." }, { city: "Koh Phangan", time: "DAY 03", note: "Choose one beach, then stay long enough to notice it." }] },
  { id: "city", code: "U / 03", name: "City as archive", mood: "museum / tram / late supper", nights: "2 nights", budget: 6200, stops: [{ city: "Singapore", time: "DAY 01", note: "Start at the old port and let the street grid do the work." }, { city: "Bras Basah", time: "DAY 02", note: "Pair one collection with one unscheduled coffee." }, { city: "Tiong Bahru", time: "DAY 03", note: "End with a neighborhood loop before the airport." }] },
];

/** The route with this id, or the first route when the id is unknown. */
export function findRoute(id: string): RoutePlan {
  return routes.find((item) => item.id === id) ?? routes[0];
}

/** The stop for a day index, falling back to the first stop when the index is out of range. */
export function stopAt(route: RoutePlan, day: number): Stop {
  return route.stops[day] ?? route.stops[0];
}

/** Next day index, never past the last stop. */
export function nextDay(route: RoutePlan, day: number): number {
  return Math.min(day + 1, route.stops.length - 1);
}

export function isLastDay(route: RoutePlan, day: number): boolean {
  return day >= route.stops.length - 1;
}

const thb = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/**
 * Budget label with a fixed locale, so the server render and the browser agree
 * (a bare toLocaleString() follows the visitor's locale and can break hydration).
 */
export function formatBudget(amount: number): string {
  return `THB ${thb.format(amount)}`;
}
