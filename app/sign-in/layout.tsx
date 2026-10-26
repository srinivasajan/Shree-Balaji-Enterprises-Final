import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a Callback",
  description:
    "Request a free callback from our Ambernath real estate team. Tell us your requirements and we will call you at your preferred time.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

