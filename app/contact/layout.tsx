import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us — Real Estate Agency in Ambernath",
  description:
    "Get in touch with Shree Balaji Enterprises (MahaRERA: A51700023633) for property enquiries, site visits, or home loan assistance in Ambernath & MMR. Call +91 7767805544.",
  alternates: {
    canonical: "https://www.shreebalajienterprises.live/contact",
  },
  openGraph: {
    title: "Contact Shree Balaji Enterprises — Real Estate in Ambernath",
    description:
      "Reach our Ambernath team by phone, WhatsApp or email. Open 7 days a week, 9 AM–9 PM for all residential and commercial property consultations.",
    url: "https://www.shreebalajienterprises.live/contact",
    type: "website",
    images: [
      {
        url: "https://www.shreebalajienterprises.live/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Shree Balaji Enterprises Ambernath",
      },
    ],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
        name: "Contact Us",
        item: "https://www.shreebalajienterprises.live/contact",
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

