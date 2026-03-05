"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { PropertyFormComponent } from "@/components/admin/property-form"
import { getAgents } from "@/lib/admin-store"
import { AgentData } from "@/lib/data"

function NewPropertyForm() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [agents, setAgents] = useState<AgentData[]>([])
  const searchParams = useSearchParams()
  const typeParam = (searchParams.get("type") ?? "buy") as "buy" | "rent"

  useEffect(() => {
    setMounted(true)
    setAgents(getAgents())
  }, [])

  if (!mounted || !authed) return null

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/properties" className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-800">Add New Property</h1>
          <p className="text-slate-500 text-sm mt-0.5">Fill in the details to create a new listing.</p>
        </div>
      </div>
      <PropertyFormComponent agents={agents} initialType={typeParam} />
    </div>
  )
}

export default function NewPropertyPage() {
  return (
    <Suspense>
      <NewPropertyForm />
    </Suspense>
  )
}
