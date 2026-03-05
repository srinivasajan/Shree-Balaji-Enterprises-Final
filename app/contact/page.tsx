"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Phone, Mail, MapPin, Clock, CheckCircle2, MessageCircle, Shield,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const propertyTypes = [
  "Residential (Flat / Bungalow / Row House)",
  "Commercial (Shop / Office / Showroom)",
  "Industrial (Warehouse / Godown)",
  "Plot / Land",
  "Home Loan Assistance",
  "Other",
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hello, I am ${form.name}.\n\nInterest: ${form.interest || "General Enquiry"}\n\nMessage: ${form.message || "Please contact me."}\n\nContact: ${form.phone || form.email}`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <>
      {/* Full-height split layout */}
      <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row">

        {/* LEFT — Dark info panel */}
        <div className="relative lg:w-[420px] xl:w-[480px] shrink-0 bg-foreground text-background flex flex-col justify-between px-8 py-14 lg:px-12 lg:py-16 overflow-hidden">
          {/* decorative blob */}
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute top-10 right-0 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative z-10">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Shree Balaji Enterprises</p>
            <h1 className="text-4xl xl:text-5xl font-black text-background leading-[1.1] mb-6">
              We&apos;re just a<br />message away.
            </h1>
            <p className="text-background/60 text-sm leading-relaxed mb-12 max-w-xs">
              Real estate experts based in Ambernath. We help families buy, sell, rent and finance property across MMR.
            </p>

            <div className="flex flex-col gap-6">
              <a href="tel:7767805544" className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 group-hover:bg-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-background/40 font-medium mb-0.5">Call Us</p>
                  <p className="text-background font-bold text-sm">7767805544 &nbsp;/&nbsp; 9168588575</p>
                </div>
              </a>

              <a href="https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-500/20 group-hover:bg-green-500 transition-colors">
                  <MessageCircle className="h-5 w-5 text-green-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-background/40 font-medium mb-0.5">WhatsApp</p>
                  <p className="text-background font-bold text-sm">Chat with us instantly</p>
                </div>
              </a>

              <a href="mailto:shreebalajienterprisesamb@gmail.com" className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 group-hover:bg-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-background/40 font-medium mb-0.5">Email</p>
                  <p className="text-background font-bold text-sm break-all">shreebalajienterprisesamb@gmail.com</p>
                </div>
              </a>

              <a href="https://maps.google.com/?q=Ambernath+West+421505" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 group-hover:bg-primary transition-colors">
                  <MapPin className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-background/40 font-medium mb-0.5">Office</p>
                  <p className="text-background font-bold text-sm">Shop No. 6, Vallabh Bldg,<br />Ambernath-West 421505</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-background/40 font-medium mb-0.5">Hours</p>
                  <p className="text-background font-bold text-sm">Mon–Sat 9AM–7PM</p>
                  <p className="text-background/60 text-xs">Sun 10AM–5PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* RERA badge at bottom */}
          <div className="relative z-10 mt-12 flex items-center gap-3 pt-8 border-t border-background/10">
            <Shield className="h-4 w-4 text-primary shrink-0" />
            <p className="text-xs text-background/50">RERA Registered &middot; Reg No: A51700023633</p>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-14 md:px-12 lg:px-16 bg-background">
          <div className="w-full max-w-[560px]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-3xl font-black text-foreground mb-3">Enquiry Sent!</h2>
                <p className="text-muted-foreground mb-8 max-w-xs text-sm leading-relaxed">
                  We&apos;ve received your message on WhatsApp and will get back to you shortly.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => setSubmitted(false)} variant="outline">New Enquiry</Button>
                  <Link href="/buy"><Button>Browse Properties</Button></Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-foreground mb-1">Send an Enquiry</h2>
                <p className="text-muted-foreground text-sm mb-8">Tell us what you need — we&apos;ll reply on WhatsApp within a few hours.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Name <span className="text-destructive">*</span></label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Phone <span className="text-destructive">*</span></label>
                      <input type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Email</label>
                    <input type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Looking For</label>
                    <select value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      title="Property type">
                      <option value="">Select property type...</option>
                      {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Message</label>
                    <textarea rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Budget, location preference, BHK, timeline — anything helps us assist you better."
                      className="px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition" />
                  </div>

                  <Button type="submit" size="lg" className="h-14 text-[15px] font-bold gap-2 rounded-xl mt-1">
                    <MessageCircle className="h-5 w-5" />
                    Send via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center -mt-1">
                    Opens WhatsApp with your message pre-filled. We never store your data.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
