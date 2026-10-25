"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ScrollProgress } from "@/components/core/scroll-progress"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <ScrollProgress className="bg-primary h-[3px] z-[100]" />
      <Header />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
