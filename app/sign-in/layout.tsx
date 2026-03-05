import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a Callback | Shree Balaji Enterprises",
  description:
    "Request a free callback from our Ambernath real estate team. Tell us your requirements and we will call you at your preferred time.",
  openGraph: {
    title: "Request a Callback | Shree Balaji Enterprises",
    description: "Get a free callback from Shree Balaji Enterprises — Ambernath's trusted RERA-registered real estate agency.",
  },
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
