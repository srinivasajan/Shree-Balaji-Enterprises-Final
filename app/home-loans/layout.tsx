import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Loan Assistance in Ambernath & MMR",
  description:
    "Get free home loan guidance from Shree Balaji Enterprises. We compare SBI, HDFC, ICICI, Axis and more to find the best rates for you — zero charges, personalised service from Ambernath.",
  alternates: {
    canonical: "https://www.shreebalajienterprises.live/home-loans",
  },
  openGraph: {
    title: "Home Loan Assistance | Shree Balaji Enterprises",
    description:
      "Free home loan comparison across 6+ partner banks. SBI, HDFC, ICICI, LIC HFL and more. Guided support from eligibility check to loan disbursement at zero cost.",
    url: "https://www.shreebalajienterprises.live/home-loans",
    type: "website",
    images: [
      {
        url: "https://www.shreebalajienterprises.live/images/mortgage-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Home Loan Assistance - Shree Balaji Enterprises",
      },
    ],
  },
}

export default function HomeLoansLayout({ children }: { children: React.ReactNode }) {
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
        name: "Home Loans",
        item: "https://www.shreebalajienterprises.live/home-loans",
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

