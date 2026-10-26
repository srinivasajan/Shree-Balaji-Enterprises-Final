import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Areas We Serve — Ambernath, Badlapur, Thane & MMR",
  description:
    "Explore 15 key real estate markets served by Shree Balaji Enterprises across the Mumbai Metropolitan Region — Ambernath, Badlapur, Ulhasnagar, Kalyan, Dombivli, Thane, Mumbai, Navi Mumbai, and Panvel.",
  alternates: {
    canonical: "https://www.shreebalajienterprises.live/locations",
  },
  openGraph: {
    title: "Areas We Serve — Ambernath, Badlapur, Thane & MMR | Shree Balaji Enterprises",
    description:
      "Explore all locations served by Shree Balaji Enterprises — 15 key localities across the Mumbai Metropolitan Region.",
    url: "https://www.shreebalajienterprises.live/locations",
    type: "website",
    images: [
      {
        url: "https://www.shreebalajienterprises.live/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Areas We Serve - Shree Balaji Enterprises",
      },
    ],
  },
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.shreebalajienterprises.live",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas We Serve",
        item: "https://www.shreebalajienterprises.live/locations",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}

