import type { MetadataRoute } from "next"
import { buyProperties, rentalProperties } from "@/lib/data"

const BASE = "https://www.shreebalajienterprises.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/buy`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/rent`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/sell`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/home-loans`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]

  const buyRoutes: MetadataRoute.Sitemap = buyProperties.map((p) => ({
    url: `${BASE}/buy/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const rentRoutes: MetadataRoute.Sitemap = rentalProperties.map((p) => ({
    url: `${BASE}/rent/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...buyRoutes, ...rentRoutes]
}
