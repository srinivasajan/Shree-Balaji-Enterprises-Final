"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { TrendingUp, Star, Building2, Pencil } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { getBuyProperties, getRentProperties, saveProperty } from "@/lib/admin-store"
import { PropertyData } from "@/lib/data"

type TaggedProperty = PropertyData & { _type: "buy" | "rent" }

export default function AdminTrendingPage() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [properties, setProperties] = useState<TaggedProperty[]>([])

  function loadData() {
    const buy = getBuyProperties().map(p => ({ ...p, _type: "buy" as const }))
    const rent = getRentProperties().map(p => ({ ...p, _type: "rent" as const }))
    setProperties([...buy, ...rent])
  }

  useEffect(() => { setMounted(true); loadData() }, [])

  if (!mounted || !authed) return null

  function toggleTrending(p: TaggedProperty) {
    saveProperty({ ...p, isTrending: !p.isTrending }, p._type)
    loadData()
  }

  function toggleFeatured(p: TaggedProperty) {
    saveProperty({ ...p, isFeatured: !p.isFeatured }, p._type)
    loadData()
  }

  const trending = properties.filter(p => p.isTrending)
  const notTrending = properties.filter(p => !p.isTrending)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-emerald-600" /> Trending Homes
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {trending.length} trending · {notTrending.length} not trending · {properties.length} total
          </p>
        </div>
      </div>

      {/* Currently Trending */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5" /> Currently Trending ({trending.length})
        </h2>
        {trending.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center text-emerald-700 text-sm">
            No trending properties yet. Toggle any property below to show it in the Trending section on the homepage.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {trending.map(p => (
              <TrendingToggleCard key={`${p._type}-${p.id}`} p={p} isTrending isFeatured={!!p.isFeatured} onToggleTrending={() => toggleTrending(p)} onToggleFeatured={() => toggleFeatured(p)} />
            ))}
          </div>
        )}
      </section>

      {/* Not Trending */}
      {notTrending.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Not Trending ({notTrending.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {notTrending.map(p => (
              <TrendingToggleCard key={`${p._type}-${p.id}`} p={p} isTrending={false} isFeatured={!!p.isFeatured} onToggleTrending={() => toggleTrending(p)} onToggleFeatured={() => toggleFeatured(p)} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function TrendingToggleCard({
  p, isTrending, isFeatured, onToggleTrending, onToggleFeatured,
}: {
  p: PropertyData & { _type: "buy" | "rent" }
  isTrending: boolean
  isFeatured: boolean
  onToggleTrending: () => void
  onToggleFeatured: () => void
}) {
  return (
    <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all ${
      isTrending
        ? "border-emerald-300 ring-1 ring-emerald-200"
        : "border-slate-100 hover:border-slate-200"
    }`}>
      {/* Image */}
      <div className="relative h-36 bg-slate-100">
        {p.image ? (
          <img src={p.image} alt={p.address} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Building2 className="h-8 w-8 text-slate-300" />
          </div>
        )}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          p._type === "buy" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
        }`}>
          {p._type === "buy" ? "For Sale" : "For Rent"}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-semibold text-slate-800 text-sm truncate">{p.address}</p>
        <p className="text-xs text-slate-400 truncate">{p.city}</p>
        <p className="text-sm font-bold text-primary mt-1">{p.price}</p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={onToggleTrending}
            title={isTrending ? "Remove from Trending" : "Add to Trending"}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
              isTrending
                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            {isTrending ? "Trending" : "Trend"}
          </button>
          <button
            onClick={onToggleFeatured}
            title={isFeatured ? "Remove from Featured" : "Add to Featured"}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
              isFeatured
                ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${isFeatured ? "fill-amber-500 text-amber-500" : ""}`} />
            {isFeatured ? "Featured" : "Feature"}
          </button>
          <Link
            href={`/admin/properties/${p._type}-${p.id}/edit`}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
