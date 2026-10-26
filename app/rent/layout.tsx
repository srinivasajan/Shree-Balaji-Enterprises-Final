import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rent Property in Ambernath & MMR",
  description:
    "Find flats, shops, offices and warehouses for rent in Ambernath, Badlapur, Ulhasnagar, Thane and across the Mumbai Metropolitan Region. RERA registered agency (MahaRERA: A51700023633).",
  alternates: {
    canonical: "https://shreebalajienterprises.live/rent",
  },
  openGraph: {
    title: "Rent Property in Ambernath & MMR | Shree Balaji Enterprises",
    description:
      "Browse rental properties — residential, commercial and industrial — across Ambernath, Badlapur and the entire MMR belt.",
    url: "https://shreebalajienterprises.live/rent",
    type: "website",
    images: [
      {
        url: "https://shreebalajienterprises.live/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Rent Property in Ambernath - Shree Balaji Enterprises",
      },
    ],
  },
}

export default function RentLayout({ children }: { children: React.ReactNode }) {
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
        name: "Rent",
        item: "https://shreebalajienterprises.live/rent",
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

