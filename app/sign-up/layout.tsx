import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register Your Interest | Shree Balaji Enterprises",
  description:
    "Register your property interest with Shree Balaji Enterprises and our expert will reach out with the best options matching your budget and location preference.",
  openGraph: {
    title: "Register Interest | Shree Balaji Enterprises",
    description: "Tell us what you're looking for and our Ambernath team will find the right property for you.",
  },
}

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
