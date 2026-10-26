import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register Your Interest",
  description:
    "Register your property interest with Shree Balaji Enterprises and our expert will reach out with the best options matching your budget and location preference.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

