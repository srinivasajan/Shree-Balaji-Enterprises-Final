import type { MetadataRoute } from "next"
import { buyProperties, rentalProperties } from "@/lib/data"

const BASE = "https://www.shreebalajienterprises.live"

export default function sitemap(): MetadataRoute.Sitemap {
  // Only include active, available listings from the source of truth
  const activeBuyProperties = buyProperties.filter(
    (p) => p.status === "for-sale" || !p.status
  )
  const activeRentalProperties = rentalProperties.filter(
    (p) => p.status === "for-rent" || !p.status
  )

  const contentUpdateDate = new Date("2026-02-24")
  const policyUpdateDate = new Date("2026-01-01")

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: contentUpdateDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/buy`, lastModified: contentUpdateDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/rent`, lastModified: contentUpdateDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/locations`, lastModified: contentUpdateDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/sell`, lastModified: contentUpdateDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/home-loans`, lastModified: contentUpdateDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: contentUpdateDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: contentUpdateDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/research-paper`, lastModified: contentUpdateDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: policyUpdateDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: policyUpdateDate, changeFrequency: "yearly", priority: 0.3 },
  ]

  const buyRoutes: MetadataRoute.Sitemap = activeBuyProperties.map((p) => ({
    url: `${BASE}/buy/${p.id}`,
    lastModified: contentUpdateDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const rentRoutes: MetadataRoute.Sitemap = activeRentalProperties.map((p) => ({
    url: `${BASE}/rent/${p.id}`,
    lastModified: contentUpdateDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...buyRoutes, ...rentRoutes]
}
