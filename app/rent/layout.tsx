import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rent Property in Ambernath & MMR | Shree Balaji Enterprises",
  description:
    "Find flats, shops, offices and warehouses for rent in Ambernath, Badlapur, Ulhasnagar, Thane and across the Mumbai Metropolitan Region. Contact our expert today.",
  openGraph: {
    title: "Rent Property in Ambernath & MMR | Shree Balaji Enterprises",
    description:
      "Browse rental properties — residential, commercial and industrial — across Ambernath, Badlapur and the entire MMR belt.",
  },
}

export default function RentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
