import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { routes } from "@/lib/trip-atlas";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...routes.map((route) => ({ url: `${SITE_URL}/routes/${route.id}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
