import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ConditionalLayout } from '@/components/conditional-layout'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = "https://www.shreebalajienterprises.live"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shree Balaji Enterprises — Real Estate in Ambernath & MMR",
    template: "%s | Shree Balaji Enterprises",
  },
  description:
    "RERA-registered real estate agency in Ambernath (Reg No: A51700023633). Buy, sell or rent residential, commercial and industrial properties across Ambernath, Badlapur, Thane, Mumbai and 13+ cities.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Shree Balaji Enterprises",
    title: "Shree Balaji Enterprises — Real Estate in Ambernath & MMR",
    description:
      "RERA-registered agency with 15+ years of experience. 1000+ happy clients. Buy, sell or rent properties across Ambernath, Badlapur, Thane & Mumbai.",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Balaji Enterprises — Real Estate in Ambernath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Balaji Enterprises — Real Estate in Ambernath & MMR",
    description:
      "RERA-registered agency. Buy, sell or rent in Ambernath, Badlapur, Thane & Mumbai.",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#006AFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Analytics />
      </body>
    </html>
  )
}
