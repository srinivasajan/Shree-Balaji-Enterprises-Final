import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Real Estate Expert — Anju Jangiti",
  description:
    "Meet Anju Jangiti, founder of Shree Balaji Enterprises (Established 2016) with 15+ years of real estate experience across Ambernath, Badlapur and the Mumbai Metropolitan Region (MahaRERA: A51700023633).",
  openGraph: {
    title: "Meet Our Expert — Anju Jangiti | Shree Balaji Enterprises",
    description:
      "Anju Jangiti — 15+ years experience, 500+ properties sold, 1000+ happy clients across MMR (Established 2016, MahaRERA: A51700023633).",
  },
}

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
