import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Shree Balaji Enterprises: Real Estate in Mumbai Metropolitan Region',
  description: 'RERA registered real estate agency in Ambernath. Find residential, commercial, and industrial properties across Ambernath, Badlapur, Thane, Mumbai, and 13+ cities.',
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
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
