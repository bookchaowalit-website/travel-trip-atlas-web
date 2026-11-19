import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RouteView } from "@/components/atlas-views";
import { routes } from "@/lib/trip-atlas";

type Props = { params: Promise<{ id: string }> };
const find = (id: string) => routes.find((route) => route.id === id);

export const dynamicParams = false;
export function generateStaticParams() {
  return routes.map((route) => ({ id: route.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = find((await params).id);
  return route ? { title: `${route.name} | Trip Atlas`, description: `${route.stops.map((stop) => stop.city).join(", ")}: an illustrative ${route.nights} route.`, alternates: { canonical: `/routes/${route.id}` } } : {};
}

export default async function RoutePage({ params }: Props) {
  const route = find((await params).id);
  if (!route) notFound();
  return <RouteView route={route} routes={routes} />;
}
