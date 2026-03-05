import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Real Estate Expert — Anju Jangiti | Shree Balaji Enterprises",
  description:
    "Meet Anju Jangiti, founder of Shree Balaji Enterprises with 15+ years of real estate experience across Ambernath, Badlapur and the Mumbai Metropolitan Region.",
  openGraph: {
    title: "Meet Our Expert | Shree Balaji Enterprises",
    description:
      "Anju Jangiti — 15+ years experience, 500+ properties sold, 1000+ happy clients across MMR.",
  },
}

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
