"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"

export function useAdminAuth() {
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login")
    }
  }, [router])
  return isAuthenticated()
}
