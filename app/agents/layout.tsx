import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Real Estate Expert — Anju Jangiti",
  description:
    "Meet Anju Jangiti, founder of Shree Balaji Enterprises, established in 2016 and serving Ambernath, Badlapur and the Mumbai Metropolitan Region (MahaRERA: A51700023633).",
  openGraph: {
    title: "Meet Our Expert — Anju Jangiti | Shree Balaji Enterprises",
    description:
      "Anju Jangiti — Founder of Shree Balaji Enterprises (Est. 2016, MahaRERA: A51700023633) serving Ambernath & MMR.",
  },
}

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
