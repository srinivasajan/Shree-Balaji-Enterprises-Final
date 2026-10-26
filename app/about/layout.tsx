import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us — Trusted Real Estate Agency in Ambernath",
  description:
    "Learn about Shree Balaji Enterprises — RERA-registered real estate agency established in 2016 (MahaRERA: A51700023633) in Ambernath, founded by Anju Jangiti. Serving clients across Ambernath, Badlapur, Thane and MMR.",
  alternates: {
    canonical: "https://www.shreebalajienterprises.live/about",
  },
  openGraph: {
    title: "About Shree Balaji Enterprises — Real Estate in Ambernath",
    description:
      "Founded by Anju Jangiti, Shree Balaji Enterprises is a RERA-registered real estate consultancy serving Ambernath, Badlapur, Thane and MMR.",
    url: "https://www.shreebalajienterprises.live/about",
    type: "website",
    images: [
      {
        url: "https://www.shreebalajienterprises.live/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "About Shree Balaji Enterprises Ambernath",
      },
    ],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
        name: "About Us",
        item: "https://www.shreebalajienterprises.live/about",
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

