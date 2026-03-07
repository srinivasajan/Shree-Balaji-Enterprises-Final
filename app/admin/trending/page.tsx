"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Building2, Search } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { getBuyProperties, getRentProperties, saveProperty } from "@/lib/admin-store"
import { PropertyData } from "@/lib/data"

type TaggedProperty = PropertyData & { _type: "buy" | "rent" }

export default function AdminTrendingPage() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [properties, setProperties] = useState<TaggedProperty[]>([])
  const [search, setSearch] = useState("")

  function loadData() {
    const buy = getBuyProperties().map(p => ({ ...p, _type: "buy" as const }))
    const rent = getRentProperties().map(p => ({ ...p, _type: "rent" as const }))
    setProperties([...buy, ...rent])
  }

  useEffect(() => { setMounted(true); loadData() }, [])
  if (!mounted || !authed) return null

  function toggle(p: TaggedProperty) {
    saveProperty({ ...p, isTrending: !p.isTrending }, p._type)
    loadData()
  }

  const filtered = properties.filter(p =>
    !search.trim() ||
    p.address.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  )

  const trendingCount = properties.filter(p => p.isTrending).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Trending Homes
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {trendingCount} trending · {properties.length} total
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Building2 className="h-10 w-10 mb-3 opacity-30" />
            <p className="font-semibold">No properties found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <th className="text-left px-5 py-3 font-semibold">Property</th>
                <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">City</th>
                <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Price</th>
                <th className="text-right px-5 py-3 font-semibold">Trending</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(p => (
                <tr key={`${p._type}-${p.id}`} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                        {p.image
                          ? <img src={p.image} alt={p.address} className="h-full w-full object-cover" />
                          : <div className="h-full w-full flex items-center justify-center"><Building2 className="h-5 w-5 text-slate-300" /></div>
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate max-w-[180px]">{p.address}</p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          p._type === "buy" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                        }`}>{p._type === "buy" ? "For Sale" : "For Rent"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 hidden sm:table-cell">{p.city}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800 hidden md:table-cell">{p.price || "—"}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => toggle(p)}
                      className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                        p.isTrending
                          ? "bg-emerald-500 border-emerald-500 text-white hover:bg-red-500 hover:border-red-500"
                          : "bg-white border-slate-200 text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      <TrendingUp className="h-4 w-4" />
                      {p.isTrending ? "Remove" : "Add to Trending"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
