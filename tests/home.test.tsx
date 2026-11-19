import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "geist" }) }));
vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));

import Home from "@/app/page";
import RoutePage, { generateMetadata, generateStaticParams } from "@/app/routes/[id]/page";
import RootLayout, { metadata } from "@/app/layout";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { routes } from "@/lib/trip-atlas";

const route = (id: string) => ({ params: Promise.resolve({ id }) });

describe("home", () => {
  it("lists every route with its budget, the honest note and the hub links", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain("<h1>Leave room for the next stop.</h1>");
    for (const item of routes) expect(html).toContain(item.name);
    expect(html).toContain("THB 7,800 budget");
    expect(html).toContain("Chiang Mai → Mae Hong Son → Pai");
    expect(html).toContain("Not live travel data");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("route page", () => {
  it("shows every day of the route and previous/next", async () => {
    const html = renderToStaticMarkup(await RoutePage(route("coast")));
    expect(html).toContain("<h1>Coastal interval</h1>");
    expect(html).toContain("Day 2 · Koh Tao");
    expect(html).toContain("Choose one beach");
    expect(html).toContain("THB 10,400 budget");
    expect(html).toContain('rel="prev"');
    expect(html).toContain('rel="next"');
  });

  it("404s an unknown route and builds every route page", async () => {
    await expect(RoutePage(route("moon"))).rejects.toThrow("NOT_FOUND");
    expect(generateStaticParams()).toEqual([{ id: "north" }, { id: "coast" }, { id: "city" }]);
    expect((await generateMetadata(route("city"))).title).toBe("City as archive | Trip Atlas");
    expect(await generateMetadata(route("moon"))).toEqual({});
  });
});

describe("site", () => {
  it("layout, sitemap and robots use travel.bookchaowalit.com", () => {
    expect(renderToStaticMarkup(RootLayout({ children: <p>x</p> }))).toContain('class="geist"');
    expect(String(metadata.metadataBase)).toBe("https://travel.bookchaowalit.com/");
    expect(sitemap().map((entry) => entry.url)).toContain("https://travel.bookchaowalit.com/routes/north");
    expect(robots().sitemap).toBe("https://travel.bookchaowalit.com/sitemap.xml");
  });
});
