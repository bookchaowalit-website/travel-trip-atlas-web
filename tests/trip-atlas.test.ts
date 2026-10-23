import { describe, expect, it } from "vitest";
import { findRoute, formatBudget, isLastDay, nextDay, routes, stopAt } from "@/lib/trip-atlas";

describe("route data", () => {
  it("has unique route ids and unique stop cities per route (they are React keys)", () => {
    expect(new Set(routes.map((r) => r.id)).size).toBe(routes.length);
    for (const route of routes) {
      expect(route.stops.length).toBeGreaterThan(0);
      expect(new Set(route.stops.map((s) => s.city)).size).toBe(route.stops.length);
      expect(route.budget).toBeGreaterThan(0);
    }
  });
});

describe("findRoute", () => {
  it("returns the route by id and falls back to the first for an unknown id", () => {
    expect(findRoute("coast").name).toBe("Coastal interval");
    expect(findRoute("nowhere")).toBe(routes[0]);
  });
});

describe("day stepping", () => {
  const route = findRoute("north");
  it("advances one day and stops at the last stop", () => {
    expect(nextDay(route, 0)).toBe(1);
    expect(nextDay(route, 1)).toBe(2);
    expect(nextDay(route, 2)).toBe(2);
  });
  it("knows when the route is complete", () => {
    expect(isLastDay(route, 0)).toBe(false);
    expect(isLastDay(route, 2)).toBe(true);
  });
  it("falls back to the first stop for an out-of-range day", () => {
    expect(stopAt(route, 1).city).toBe("Mae Hong Son");
    expect(stopAt(route, 9).city).toBe("Chiang Mai");
    expect(stopAt(route, -1).city).toBe("Chiang Mai");
  });
});

describe("formatBudget", () => {
  it("uses a fixed en-US grouping regardless of the runtime locale", () => {
    expect(formatBudget(7800)).toBe("THB 7,800");
    expect(formatBudget(10400)).toBe("THB 10,400");
    expect(formatBudget(950)).toBe("THB 950");
  });
});
