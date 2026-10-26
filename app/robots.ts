import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.shreebalajienterprises.live"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        "/sign-in",
        "/sign-up",
        "/*?*q=",
        "/*?*type=",
        "/*?*beds=",
        "/*?*minPrice=",
        "/*?*maxPrice=",
        "/*?*sort=",
        "/*?*page=",
        "/*?*property=",
        "/*?*ref=",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
