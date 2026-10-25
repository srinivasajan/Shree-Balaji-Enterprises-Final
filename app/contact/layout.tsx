import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Shree Balaji Enterprises, Ambernath",
  description:
    "Get in touch with Shree Balaji Enterprises (MahaRERA: A51700023633) for property enquiries, site visits, or home loan assistance in Ambernath & MMR. Call +91 7767805544.",
  alternates: {
    canonical: "https://www.shreebalajienterprises.live/contact",
  },
  openGraph: {
    title: "Contact Shree Balaji Enterprises — Real Estate in Ambernath",
    description:
      "Reach our Ambernath team by phone, WhatsApp or email. Open 7 days a week, 9 AM–9 PM for all residential and commercial property consultations.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
