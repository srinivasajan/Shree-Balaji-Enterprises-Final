import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Areas We Serve — Ambernath, Thane, Mumbai & 13+ Cities | Shree Balaji Enterprises",
  description:
    "Shree Balaji Enterprises serves 13+ cities across the Mumbai Metropolitan Region — Ambernath, Badlapur, Ulhasnagar, Kalyan, Dombivli, Thane, Mumbai, Navi Mumbai, Panvel and more. Explore properties in your area.",
  openGraph: {
    title: "Areas We Serve — Ambernath, Thane, Mumbai & MMR",
    description:
      "Explore all locations served by Shree Balaji Enterprises — 13+ cities across the Mumbai Metropolitan Region.",
  },
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
