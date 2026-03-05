"use client"

import { useEffect, useState } from "react"
import { Users, Plus, Pencil, Trash2, X, Save, Star } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { getAgents, saveAgent, deleteAgent, nextAgentId } from "@/lib/admin-store"
import { AgentData } from "@/lib/data"

const BLANK_AGENT: Partial<AgentData> = {
  name: "", phone: "", email: "", company: "Shree Balaji Enterprises",
  rating: 5.0, reviewCount: 0, salesCount: 0,
  bio: "", specialties: [], areas: [], yearsExperience: 0,
  image: "",
}

export default function AdminAgentsPage() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [agents, setAgents] = useState<AgentData[]>([])
  const [editing, setEditing] = useState<Partial<AgentData> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [specialtyInput, setSpecialtyInput] = useState("")
  const [areaInput, setAreaInput] = useState("")
  const [saving, setSaving] = useState(false)

  function load() {
    setAgents(getAgents())
  }
  useEffect(() => { setMounted(true); load() }, [])

  if (!mounted || !authed) return null

  function openNew() {
    setEditing({ ...BLANK_AGENT })
    setIsNew(true)
    setSpecialtyInput("")
    setAreaInput("")
  }
  function openEdit(a: AgentData) {
    setEditing({ ...a })
    setIsNew(false)
    setSpecialtyInput("")
    setAreaInput("")
  }
  function setVal(k: keyof AgentData, v: unknown) {
    setEditing(prev => prev ? { ...prev, [k]: v } : prev)
  }
  function addItem(field: "specialties" | "areas", input: string, setInput: (v: string) => void) {
    if (!input.trim()) return
    setVal(field, [...((editing as any)?.[field] ?? []), input.trim()])
    setInput("")
  }
  function removeItem(field: "specialties" | "areas", i: number) {
    setVal(field, ((editing as any)?.[field] ?? []).filter((_: unknown, idx: number) => idx !== i))
  }

  function handleSave() {
    if (!editing) return
    setSaving(true)
    const id = editing.id ?? nextAgentId()
    const agent = { ...BLANK_AGENT, ...editing, id } as AgentData
    setTimeout(() => {
      saveAgent(agent)
      load()
      setEditing(null)
      setSaving(false)
    }, 300)
  }

  function confirmDelete(id: number) { setDeleteId(id) }
  function handleDelete() {
    if (deleteId == null) return
    deleteAgent(deleteId)
    setDeleteId(null)
    load()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Agents</h1>
          <p className="text-slate-500 text-sm mt-0.5">{agents.length} team members</p>
        </div>
        <button onClick={openNew}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> Add Agent
        </button>
      </div>

      {/* Agent cards */}
      {agents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 shadow-sm">
          <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No agents found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div key={agent.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    {agent.image ? (
                      <img src={agent.image} alt={agent.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                        {agent.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-800 truncate">{agent.name}</h3>
                    <p className="text-xs text-slate-500">{agent.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-slate-700">{agent.rating}</span>
                      <span className="text-xs text-slate-400">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <p>📞 {agent.phone}</p>
                  <p>✉️ {agent.email}</p>
                  <p>🏆 {agent.salesCount} sales · {agent.yearsExperience}yr exp</p>
                </div>
                {agent.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {agent.specialties.map(s => (
                      <span key={s} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t border-slate-100 flex">
                <button onClick={() => openEdit(agent)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button onClick={() => confirmDelete(agent.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors border-l border-slate-100">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/New drawer */}
      {editing && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
          <div className="relative ml-auto w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">{isNew ? "Add Agent" : "Edit Agent"}</h2>
              <button onClick={() => setEditing(null)} aria-label="Close" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 p-6 space-y-5 overflow-y-auto">
              {/* Image */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Photo URL</label>
                <input type="url" value={editing.image ?? ""} onChange={e => setVal("image", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  placeholder="https://…" />
              </div>
              {[
                { label: "Full Name *", key: "name", placeholder: "Anju Jangiti" },
                { label: "Phone", key: "phone", placeholder: "7767805544" },
                { label: "Email", key: "email", placeholder: "agent@example.com" },
                { label: "Company", key: "company", placeholder: "Shree Balaji Enterprises" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
                  <input type="text" value={(editing as any)[key] ?? ""} onChange={e => setVal(key as keyof AgentData, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder={placeholder} />
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Rating</label>
                  <input type="number" min={0} max={5} step={0.1} value={editing.rating ?? 5}
                    aria-label="Rating"
                    onChange={e => setVal("rating", parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Reviews</label>
                  <input type="number" min={0} value={editing.reviewCount ?? 0}
                    aria-label="Review count"
                    onChange={e => setVal("reviewCount", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Sales</label>
                  <input type="number" min={0} value={editing.salesCount ?? 0}
                    aria-label="Sales count"
                    onChange={e => setVal("salesCount", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Years Experience</label>
                <input type="number" min={0} value={editing.yearsExperience ?? 0}
                  aria-label="Years experience"
                  onChange={e => setVal("yearsExperience", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Bio</label>
                <textarea value={editing.bio ?? ""} onChange={e => setVal("bio", e.target.value)} rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                  placeholder="Short professional bio…" />
              </div>
              {/* Specialties */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Specialties</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={specialtyInput} onChange={e => setSpecialtyInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addItem("specialties", specialtyInput, setSpecialtyInput) }}}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="Residential, Commercial…" />
                  <button type="button" onClick={() => addItem("specialties", specialtyInput, setSpecialtyInput)}
                    aria-label="Add specialty" className="px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(editing.specialties ?? []).map((s, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
                      {s}
                      <button type="button" onClick={() => removeItem("specialties", i)} aria-label="Remove specialty" className="hover:text-red-500"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
              {/* Areas */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Service Areas</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={areaInput} onChange={e => setAreaInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addItem("areas", areaInput, setAreaInput) }}}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="Ambernath, Thane…" />
                  <button type="button" onClick={() => addItem("areas", areaInput, setAreaInput)}
                    aria-label="Add area" className="px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(editing.areas ?? []).map((a, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                      {a}
                      <button type="button" onClick={() => removeItem("areas", i)} aria-label="Remove area" className="hover:text-red-500"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 px-6 py-4 flex gap-3">
              <button onClick={() => setEditing(null)}
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || !editing?.name?.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors">
                <Save className="h-4 w-4" />
                {saving ? "Saving…" : "Save Agent"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-10">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-800">Delete Agent?</h3>
            <p className="text-sm text-slate-500 text-center mt-2">This will remove the agent from your team permanently.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-semibold text-white transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
