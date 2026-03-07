"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { PropertyFormComponent } from "@/components/admin/property-form"
import { getBuyProperties, getRentProperties, getAgents } from "@/lib/admin-store"
import { PropertyData, AgentData } from "@/lib/data"

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = use(params)
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [property, setProperty] = useState<PropertyData | null>(null)
  const [propType, setPropType] = useState<"buy" | "rent">("buy")
  const [agents, setAgents] = useState<AgentData[]>([])

  useEffect(() => {
    setMounted(true)
    setAgents(getAgents())
    // params.id format: "buy-1" or "rent-2"
    const id = rawId
    const match = id.match(/^(buy|rent)-(\d+)$/)
    if (!match) return
    const type = match[1] as "buy" | "rent"
    const numId = Number(match[2])
    setPropType(type)
    const list = type === "buy" ? getBuyProperties() : getRentProperties()
    const found = list.find(p => p.id === numId)
    if (found) setProperty(found)
  }, [rawId])

  if (!mounted || !authed) return null

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/properties" className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-800">Edit Property</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {property ? `Editing: ${property.address}, ${property.city}` : "Loading…"}
          </p>
        </div>
      </div>
      {property ? (
        <PropertyFormComponent
          initialData={property}
          initialType={propType}
          agents={agents}
          isEdit
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 shadow-sm">
          <p className="font-semibold">Property not found</p>
          <p className="text-sm mt-1">The property you're trying to edit does not exist.</p>
          <Link href="/admin/properties" className="text-primary text-sm font-semibold mt-4 inline-block hover:underline">
            ← Back to Properties
          </Link>
        </div>
      )}
    </div>
  )
}
