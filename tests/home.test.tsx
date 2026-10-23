import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { routes } from "@/lib/trip-atlas";

describe("home page", () => {
  it("renders every synthetic route with its budget and the not-live-data notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Leave room");
    for (const route of routes) expect(html).toContain(route.name);
    expect(html).toContain("THB 7,800");
    expect(html).toContain("ILLUSTRATIVE ROUTES · NOT LIVE TRAVEL DATA");
  });
  it("opens the first route on day one", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Arrive before noon");
    expect(html).toContain("Mark next stop");
  });
});
