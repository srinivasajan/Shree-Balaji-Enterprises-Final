"use client"

import { useEffect, useState } from "react"
import { Save, Settings, RefreshCw, CheckCircle2, Building2, Phone, Mail, MapPin, Link as LinkIcon, Shield, ToggleLeft, ToggleRight } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { getSettings, saveSettings, SiteSettings } from "@/lib/admin-store"

export default function AdminSettingsPage() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState<SiteSettings | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
    setForm(getSettings())
  }, [])

  if (!mounted || !authed || !form) return null

  function set(k: keyof SiteSettings, v: unknown) {
    setForm(prev => prev ? { ...prev, [k]: v } : prev)
    setSaved(false)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setTimeout(() => {
      saveSettings(form)
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 400)
  }

  function handleReset() {
    // Clear only admin-overridden settings
    localStorage.removeItem("sbe_settings")
    const fresh = getSettings()
    setForm(fresh)
    setSaved(false)
  }

  const Field = ({ label, k, type = "text", placeholder = "" }: { label: string; k: keyof SiteSettings; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={(form as any)[k] as string ?? ""}
        onChange={e => set(k, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
    </div>
  )

  const Toggle = ({ label, desc, k }: { label: string; desc: string; k: keyof SiteSettings }) => (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <button type="button" onClick={() => set(k, !(form as any)[k])}
        className={`flex-shrink-0 transition-colors ${(form as any)[k] ? "text-primary" : "text-slate-300"}`}>
        {(form as any)[k]
          ? <ToggleRight className="h-8 w-8" />
          : <ToggleLeft className="h-8 w-8" />}
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Settings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Configure your site information and preferences.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <RefreshCw className="h-4 w-4" /> Reset
          </button>
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors">
            {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <Building2 className="h-4 w-4 text-primary" /> Business Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Business Name" k="siteName" placeholder="Shree Balaji Enterprises" />
          <Field label="Tagline" k="tagline" placeholder="Your Trusted Real Estate Partner" />
          <Field label="Phone" k="phone" type="tel" placeholder="7767805544" />
          <Field label="Email" k="email" type="email" placeholder="anjujangiti@gmail.com" />
          <div className="sm:col-span-2">
            <Field label="Address" k="address" placeholder="Ambernath, Maharashtra" />
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <Shield className="h-4 w-4 text-emerald-500" /> Compliance
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="RERA Registration Number" k="reraNo" placeholder="A51700023633" />
          <Field label="WhatsApp Number (with country code)" k="whatsapp" placeholder="917767805544" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <LinkIcon className="h-4 w-4 text-blue-500" /> Homepage Hero Content
        </h2>
        <div className="space-y-4">
          <Field label="Hero Title" k="heroTitle" placeholder="Find Your Dream Property…" />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Hero Subtitle</label>
            <textarea
              value={form.heroSubtitle}
              onChange={e => set("heroSubtitle", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              placeholder="15+ years of trusted real estate experience…"
            />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
          <Settings className="h-4 w-4 text-slate-500" /> Feature Toggles
        </h2>
        <div className="space-y-4 divide-y divide-slate-100">
          <div className="pb-4">
            <Toggle
              label="WhatsApp Button"
              desc="Show the floating WhatsApp contact button on all public pages."
              k="enableWhatsAppButton"
            />
          </div>
          <div className="pt-4">
            <Toggle
              label="Vercel Analytics"
              desc="Enable anonymous page-view analytics via Vercel Analytics."
              k="enableAnalytics"
            />
          </div>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-semibold">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          Settings saved to local storage successfully.
        </div>
      )}
    </form>
  )
}
