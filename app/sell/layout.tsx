import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell Your Property in Ambernath & MMR",
  description:
    "Get a free property valuation and sell your home, shop or land at the best price with Shree Balaji Enterprises — trusted RERA-registered agency (Established 2016, MahaRERA: A51700023633) in Ambernath.",
  alternates: {
    canonical: "https://shreebalajienterprises.live/sell",
  },
  openGraph: {
    title: "Sell Your Property | Shree Balaji Enterprises",
    description:
      "Free property valuation and full selling support from Ambernath's trusted RERA-registered agency.",
    url: "https://shreebalajienterprises.live/sell",
    type: "website",
    images: [
      {
        url: "https://shreebalajienterprises.live/images/sell-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sell Your Property in Ambernath - Shree Balaji Enterprises",
      },
    ],
  },
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://shreebalajienterprises.live",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sell Your Property",
        item: "https://shreebalajienterprises.live/sell",
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

