import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us — Trusted Real Estate in Ambernath | Shree Balaji Enterprises",
  description:
    "Learn about Shree Balaji Enterprises — 15+ years of real estate expertise, 1000+ happy clients, RERA registered (A51700023633), and proudly serving the Mumbai Metropolitan Region since 2010.",
  openGraph: {
    title: "About Shree Balaji Enterprises — Real Estate in Ambernath",
    description:
      "Founded by Anju Jangiti, Shree Balaji Enterprises has served 1000+ clients across Ambernath, Badlapur, Thane and MMR for 15+ years.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
