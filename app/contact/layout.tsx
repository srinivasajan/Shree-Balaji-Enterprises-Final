import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us — Shree Balaji Enterprises, Ambernath",
  description:
    "Get in touch with Shree Balaji Enterprises for property enquiries, site visits, or home loan assistance. Call 7767805544 or WhatsApp us — our Ambernath team responds fast.",
  openGraph: {
    title: "Contact Shree Balaji Enterprises",
    description:
      "Reach our Ambernath team by phone, WhatsApp or email. Available Mon–Sat 9 AM–7 PM for all property and home loan enquiries.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
