import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell Your Property in Ambernath & MMR",
  description:
    "Get a free property valuation and sell your home, shop or land at the best price with Shree Balaji Enterprises — trusted RERA-registered agency established in 2016 in Ambernath (MahaRERA: A51700023633).",
  alternates: {
    canonical: "https://www.shreebalajienterprises.live/sell",
  },
  openGraph: {
    title: "Sell Your Property | Shree Balaji Enterprises",
    description:
      "Free property valuation and full selling support from Ambernath's trusted RERA-registered agency.",
    url: "https://www.shreebalajienterprises.live/sell",
    type: "website",
    images: [
      {
        url: "https://www.shreebalajienterprises.live/images/sell-hero.jpg",
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
        item: "https://www.shreebalajienterprises.live",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sell Your Property",
        item: "https://www.shreebalajienterprises.live/sell",
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

