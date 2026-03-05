import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Property in Ambernath, Badlapur & MMR | Shree Balaji Enterprises",
  description:
    "Browse residential, commercial and industrial properties for sale in Ambernath, Badlapur, Ulhasnagar, Thane and across the Mumbai Metropolitan Region. RERA registered agency.",
  openGraph: {
    title: "Buy Property in Ambernath & MMR | Shree Balaji Enterprises",
    description:
      "Find your perfect home or investment property in Ambernath, Badlapur and the Mumbai Metropolitan Region with Shree Balaji Enterprises.",
  },
}

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
