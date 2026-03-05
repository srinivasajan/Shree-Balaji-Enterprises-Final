"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === "/admin/login"

  if (isLogin) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <AdminSidebar />
      <div className="lg:pl-60 pt-14 lg:pt-0 min-h-screen flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
