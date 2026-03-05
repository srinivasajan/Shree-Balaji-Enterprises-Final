import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell Your Property in Ambernath & MMR | Shree Balaji Enterprises",
  description:
    "Get a free property valuation and sell your home, shop or land at the best price with Shree Balaji Enterprises — 15+ years of trusted real estate experience in Ambernath.",
  openGraph: {
    title: "Sell Your Property | Shree Balaji Enterprises",
    description:
      "Free property valuation and full selling support from Ambernath's most trusted RERA-registered agency. 500+ properties sold.",
  },
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
