"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Trash2, Mail, Phone, CheckCircle2, Clock, XCircle, Search, Filter } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { getInquiries, saveInquiry, deleteInquiry, Inquiry } from "@/lib/admin-store"

const STATUS_OPTS = [
  { value: "new", label: "New", color: "text-blue-700 bg-blue-50 border-blue-200", icon: Clock },
  { value: "contacted", label: "Contacted", color: "text-amber-700 bg-amber-50 border-amber-200", icon: CheckCircle2 },
  { value: "closed", label: "Closed", color: "text-slate-600 bg-slate-100 border-slate-200", icon: XCircle },
]

export default function AdminInquiriesPage() {
  const authed = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  function load() { setInquiries(getInquiries()) }
  useEffect(() => { setMounted(true); load() }, [])
  if (!mounted || !authed) return null

  const filtered = inquiries.filter(i => {
    const q = search.toLowerCase()
    const matchSearch = !q || i.name.toLowerCase().includes(q) || i.phone.includes(q) || i.email.toLowerCase().includes(q) || i.interest.toLowerCase().includes(q)
    const matchStatus = filterStatus === "all" || i.status === filterStatus
    return matchSearch && matchStatus
  })

  function setStatus(id: number, status: Inquiry["status"]) {
    const inq = inquiries.find(i => i.id === id)
    if (!inq) return
    saveInquiry({ ...inq, status })
    load()
  }

  const counts = {
    all: inquiries.length,
    new: inquiries.filter(i => i.status === "new").length,
    contacted: inquiries.filter(i => i.status === "contacted").length,
    closed: inquiries.filter(i => i.status === "closed").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800">Inquiries</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage all inbound property enquiries and leads.</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "all", label: `All (${counts.all})` },
          { key: "new", label: `New (${counts.new})` },
          { key: "contacted", label: `Contacted (${counts.contacted})` },
          { key: "closed", label: `Closed (${counts.closed})` },
        ].map(tab => (
          <button key={tab.key} onClick={() => setFilterStatus(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${filterStatus === tab.key ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-200 hover:border-primary"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input type="text" placeholder="Search by name, phone, email, interest…"
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm" />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 shadow-sm">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(inq => {
            const statusOpt = STATUS_OPTS.find(s => s.value === inq.status) ?? STATUS_OPTS[0]
            const Icon = statusOpt.icon
            const isOpen = expanded === inq.id
            return (
              <div key={inq.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : inq.id)}>
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {inq.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800">{inq.name}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusOpt.color}`}>
                        {statusOpt.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{inq.interest} · {inq.date}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-slate-400">
                    <a href={`tel:${inq.phone}`} onClick={e => e.stopPropagation()} aria-label={`Call ${inq.name}`}
                      className="p-2 rounded-lg hover:bg-slate-100 hover:text-primary transition-colors"><Phone className="h-4 w-4" /></a>
                    <a href={`mailto:${inq.email}`} onClick={e => e.stopPropagation()} aria-label={`Email ${inq.name}`}
                      className="p-2 rounded-lg hover:bg-slate-100 hover:text-primary transition-colors"><Mail className="h-4 w-4" /></a>
                    <button onClick={e => { e.stopPropagation(); setDeleteId(inq.id) }} aria-label="Delete inquiry"
                      className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-slate-100">
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <a href={`tel:${inq.phone}`} className="hover:text-primary">{inq.phone}</a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <a href={`mailto:${inq.email}`} className="hover:text-primary truncate">{inq.email}</a>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Message</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{inq.message || "—"}</p>
                      </div>
                    </div>
                    {/* Status change */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <p className="text-xs font-semibold text-slate-500 w-full">Change Status:</p>
                      {STATUS_OPTS.map(s => (
                        <button key={s.value} onClick={() => setStatus(inq.id, s.value as Inquiry["status"])}
                          disabled={inq.status === s.value}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${inq.status === s.value ? s.color + " cursor-default" : "bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary"}`}>
                          {s.label}
                        </button>
                      ))}
                      <a
                        href={`https://wa.me/91${inq.phone}?text=${encodeURIComponent(`Hello ${inq.name}, this is Shree Balaji Enterprises. We received your inquiry regarding ${inq.interest}. How can we help you?`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500 hover:bg-green-600 text-white border border-green-500 transition-colors">
                        WhatsApp
                      </a>
                    </div>
                    <div className="sm:hidden flex gap-2 mt-3">
                      <a href={`tel:${inq.phone}`} className="flex-1 text-center py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">Call</a>
                      <a href={`mailto:${inq.email}`} className="flex-1 text-center py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">Email</a>
                      <button onClick={() => setDeleteId(inq.id)} className="flex-1 py-2 border border-red-200 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
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
            <h3 className="text-lg font-bold text-center text-slate-800">Delete Inquiry?</h3>
            <p className="text-sm text-slate-500 text-center mt-2">This will permanently remove the inquiry record.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => { deleteInquiry(deleteId); setDeleteId(null); load() }} className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-semibold text-white transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
