import type { MetadataRoute } from "next";
import { getFilms } from "@/lib/sanity/queries";

const BASE_URL = "https://skmlmotionpictures.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/movies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic film routes from Sanity
  let filmRoutes: MetadataRoute.Sitemap = [];
  try {
    const films = await getFilms();
    filmRoutes = films
      .filter((f) => f.slug?.current)
      .map((f) => ({
        url: `${BASE_URL}/films/${f.slug!.current}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    // Sanity unavailable — return only static routes
  }

  return [...staticRoutes, ...filmRoutes];
}
