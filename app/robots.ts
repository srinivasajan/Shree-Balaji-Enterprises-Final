import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://shreebalajienterprises.live"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/api/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
