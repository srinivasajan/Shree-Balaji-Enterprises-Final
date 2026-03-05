"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Building2, Users, MessageSquare, TrendingUp,
  Plus, Eye, ArrowRight, CheckCircle2,
  Clock, Home, ShoppingBag, BadgeCheck
} from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { StatsCard } from "@/components/admin/stats-card"
import {
  getBuyProperties, getRentProperties, getAgents, getInquiries
} from "@/lib/admin-store"

interface RecentItem {
  id: number
  title: string
  meta: string
  status: string
  statusColor: string
  date: string
}

export default function AdminDashboard() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [buyCount, setBuyCount] = useState(0)
  const [rentCount, setRentCount] = useState(0)
  const [agentCount, setAgentCount] = useState(0)
  const [inquiryData, setInquiryData] = useState({ total: 0, new: 0 })
  const [recentProps, setRecentProps] = useState<RecentItem[]>([])
  const [recentInquiries, setRecentInquiries] = useState<RecentItem[]>([])

  useEffect(() => {
    setMounted(true)
    const buy = getBuyProperties()
    const rent = getRentProperties()
    const agents = getAgents()
    const inquiries = getInquiries()

    setBuyCount(buy.length)
    setRentCount(rent.length)
    setAgentCount(agents.length)
    setInquiryData({ total: inquiries.length, new: inquiries.filter(i => i.status === "new").length })

    setRecentProps(
      [...buy, ...rent].slice(-5).reverse().map(p => ({
        id: p.id,
        title: p.address,
        meta: `${p.city} · ${p.type ?? "Property"}`,
        status: p.status === "for-rent" ? "For Rent" : p.status === "sold" ? "Sold" : "For Sale",
        statusColor: p.status === "for-rent" ? "text-purple-600 bg-purple-50" : p.status === "sold" ? "text-slate-600 bg-slate-100" : "text-emerald-600 bg-emerald-50",
        date: `${p.daysOnMarket ?? 0}d ago`,
      }))
    )
    setRecentInquiries(
      inquiries.slice(-5).reverse().map(i => ({
        id: i.id,
        title: i.name,
        meta: i.interest,
        status: i.status === "new" ? "New" : i.status === "contacted" ? "Contacted" : "Closed",
        statusColor: i.status === "new" ? "text-blue-600 bg-blue-50" : i.status === "contacted" ? "text-amber-600 bg-amber-50" : "text-slate-600 bg-slate-100",
        date: i.date,
      }))
    )
  }, [])

  if (!mounted || !authed) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back, Admin. Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Property
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Buy Listings"
          value={buyCount}
          subtitle="Active for-sale properties"
          icon={ShoppingBag}
          color="blue"
        />
        <StatsCard
          title="Rent Listings"
          value={rentCount}
          subtitle="Active rental properties"
          icon={Home}
          color="purple"
        />
        <StatsCard
          title="Agents"
          value={agentCount}
          subtitle="Active team members"
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Inquiries"
          value={inquiryData.total}
          subtitle={`${inquiryData.new} new unread`}
          icon={MessageSquare}
          color="amber"
          trend={inquiryData.new > 0 ? { value: `${inquiryData.new} new`, up: true } : undefined}
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/admin/properties/new", icon: Plus, label: "Add Property", color: "bg-blue-500" },
            { href: "/admin/properties", icon: Building2, label: "All Properties", color: "bg-purple-500" },
            { href: "/admin/inquiries", icon: MessageSquare, label: "View Inquiries", color: "bg-amber-500" },
            { href: "/admin/agents", icon: Users, label: "Manage Agents", color: "bg-emerald-500" },
          ].map(({ href, icon: Icon, label, color }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <div className={`h-10 w-10 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-700 group-hover:text-primary transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" /> Recent Properties
            </h2>
            <Link href="/admin/properties" className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {recentProps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Building2 className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm">No properties yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {recentProps.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{p.title}</p>
                    <p className="text-xs text-slate-400">{p.meta}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-2 ${p.statusColor}`}>
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-amber-500" /> Recent Inquiries
            </h2>
            <Link href="/admin/inquiries" className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-50">
            {recentInquiries.map((i) => (
              <li key={i.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{i.title}</p>
                  <p className="text-xs text-slate-400 truncate">{i.meta}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-2 ${i.statusColor}`}>
                  {i.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-50 border border-primary/10 rounded-2xl p-5 flex items-start gap-4">
        <BadgeCheck className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-slate-800">RERA Registered Agency</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Reg. No: <strong>A51700023633</strong> · Shree Balaji Enterprises, Ambernath, Maharashtra
          </p>
        </div>
      </div>
    </div>
  )
}
