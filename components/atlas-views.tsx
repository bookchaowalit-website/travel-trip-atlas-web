import type { ReactNode } from "react";
import { ArticleHeader, EntryList, Pager, Prose, Reader, ReaderFoot, ReaderHead, ReaderTop, neighbours, plural } from "@/components/reader-shell";
import { formatBudget, type RoutePlan } from "@/lib/trip-atlas";

const SOURCE = "https://github.com/bookchaowalit-website/travel-trip-atlas-web";
const NOTE = "Illustrative routes and budgets for a design demo. Not live travel data; nothing is fetched or booked.";

function Frame({ children }: { children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop name="Trip Atlas" tagline="Route before reservation" links={[{ href: "/", label: "Routes" }]} />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot source={SOURCE} note={NOTE} />
    </Reader>
  );
}

export function HomeView({ routes }: { routes: RoutePlan[] }) {
  return (
    <Frame>
      <ReaderHead
        eyebrow="Route planning desk"
        title="Leave room for the next stop."
        lede="An itinerary desk for choosing a route, reading it day by day, and keeping the cost visible before anything is booked."
      />
      <p className="rs-count" role="status">{plural(routes.length, "route")}</p>
      <EntryList
        entries={routes.map((route) => ({
          href: `/routes/${route.id}`,
          title: route.name,
          summary: route.stops.map((stop) => stop.city).join(" → "),
          meta: [route.nights, `${formatBudget(route.budget)} budget`],
          tags: [route.code, ...route.mood.split(" / ")],
        }))}
      />
    </Frame>
  );
}

export function RouteView({ route, routes }: { route: RoutePlan; routes: RoutePlan[] }) {
  const { previous, next } = neighbours(routes, routes.findIndex((item) => item.id === route.id));
  return (
    <Frame>
      <article>
        <ArticleHeader
          back={{ href: "/", label: "All routes" }}
          tags={[route.code, ...route.mood.split(" / ")]}
          title={route.name}
          lede={`${route.stops[0].city} to ${route.stops[route.stops.length - 1].city}, ${route.nights}.`}
          meta={[route.nights, `${formatBudget(route.budget)} budget`, plural(route.stops.length, "stop")]}
        />
        <Prose>
          <h2>Day by day</h2>
          <ol className="ta-days">
            {route.stops.map((stop, index) => (
              <li key={stop.city}><strong>Day {index + 1} · {stop.city}</strong> — {stop.note}</li>
            ))}
          </ol>
          <p>The budget is a rough figure for the whole route, written by hand for this demo, not a quote.</p>
        </Prose>
        <Pager
          label="More routes"
          previous={previous ? { href: `/routes/${previous.id}`, title: previous.name, label: "Previous route" } : undefined}
          next={next ? { href: `/routes/${next.id}`, title: next.name, label: "Next route" } : undefined}
        />
      </article>
    </Frame>
  );
}
