import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Property in Ambernath, Badlapur & MMR",
  description:
    "Browse residential, commercial and industrial properties for sale in Ambernath, Badlapur, Ulhasnagar, Thane and across the Mumbai Metropolitan Region. RERA registered agency (MahaRERA: A51700023633).",
  alternates: {
    canonical: "https://shreebalajienterprises.live/buy",
  },
  openGraph: {
    title: "Buy Property in Ambernath & MMR | Shree Balaji Enterprises",
    description:
      "Find your perfect home or investment property in Ambernath, Badlapur and the Mumbai Metropolitan Region with Shree Balaji Enterprises.",
    url: "https://shreebalajienterprises.live/buy",
    type: "website",
    images: [
      {
        url: "https://shreebalajienterprises.live/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Buy Property in Ambernath - Shree Balaji Enterprises",
      },
    ],
  },
}

export default function BuyLayout({ children }: { children: React.ReactNode }) {
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
        name: "Buy",
        item: "https://shreebalajienterprises.live/buy",
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

