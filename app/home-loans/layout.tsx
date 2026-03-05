import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Loan Assistance in Ambernath | Shree Balaji Enterprises",
  description:
    "Get free home loan guidance from Shree Balaji Enterprises. We compare SBI, HDFC, ICICI and more to find the best rates for you — zero charges, personalised service from Ambernath.",
  openGraph: {
    title: "Home Loan Assistance | Shree Balaji Enterprises",
    description:
      "Free home loan comparison across 6+ banks. SBI, HDFC, ICICI, Bank of Baroda and more. We guide you from eligibility to disbursement at no cost.",
  },
}

export default function HomeLoansLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
