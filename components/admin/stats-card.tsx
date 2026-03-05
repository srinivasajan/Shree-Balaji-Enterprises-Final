import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: "blue" | "green" | "purple" | "amber" | "red"
  trend?: { value: string; up: boolean }
}

const colorMap = {
  blue: { bg: "bg-blue-50", icon: "bg-blue-500", text: "text-blue-600", ring: "ring-blue-100" },
  green: { bg: "bg-emerald-50", icon: "bg-emerald-500", text: "text-emerald-600", ring: "ring-emerald-100" },
  purple: { bg: "bg-purple-50", icon: "bg-purple-500", text: "text-purple-600", ring: "ring-purple-100" },
  amber: { bg: "bg-amber-50", icon: "bg-amber-500", text: "text-amber-600", ring: "ring-amber-100" },
  red: { bg: "bg-red-50", icon: "bg-red-500", text: "text-red-600", ring: "ring-red-100" },
}

export function StatsCard({ title, value, subtitle, icon: Icon, color = "blue", trend }: StatsCardProps) {
  const c = colorMap[color]
  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-slate-100 ring-1", c.ring)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {trend && (
            <p className={cn("text-xs font-semibold mt-2", trend.up ? "text-emerald-600" : "text-red-500")}>
              {trend.up ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", c.icon)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}
