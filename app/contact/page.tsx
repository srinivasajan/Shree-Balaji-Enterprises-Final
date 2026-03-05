"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, CheckCircle2, MessageCircle, Shield, ArrowUpRight, Zap, Star } from "lucide-react"
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

const INPUT = "w-full px-4 py-3.5 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(`Hello, I am ${form.name}.\n\nInterest: ${form.interest || "General Enquiry"}\n\nMessage: ${form.message || "Please contact me."}\n\nContact: ${form.phone || form.email}`)
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <>
      <section className="bg-background">

        {/* ── HERO STRIP ── */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-[1100px] px-4 py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-6 rounded-full bg-primary" />
                  <p className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Contact Us</p>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-foreground leading-[0.95] tracking-tight">
                  Get in<br />Touch
                </h1>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 md:gap-10 md:pb-2">
                {[
                  { icon: Zap, value: "< 2 hrs", label: "Response time" },
                  { icon: Star, value: "1000+", label: "Happy clients" },
                  { icon: Shield, value: "RERA", label: "A51700023633" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-black text-foreground leading-none mb-0.5">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick-reach pills */}
            <div className="flex flex-wrap gap-2.5 mt-10">
              <a href="tel:7767805544"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-5 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                <Phone className="h-3.5 w-3.5" /> 7767805544
              </a>
              <a href="https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors shadow-sm">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Us
              </a>
              <a href="mailto:shreebalajienterprisesamb@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-5 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5" /> Email Us
              </a>
              <a href="https://maps.google.com/?q=Ambernath+West+421505" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-5 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                <MapPin className="h-3.5 w-3.5" /> Ambernath West
              </a>
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="mx-auto max-w-[1100px] px-4 py-14 md:py-20">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-3">We got your message!</h2>
              <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
                Your enquiry was forwarded to our WhatsApp. We&apos;ll reach out within a couple of hours.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
                <Link href="/buy"><Button>Browse Properties</Button></Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14">

              {/* ── FORM ── */}
              <div className="lg:col-span-3">
                <div className="bg-card border-2 border-border rounded-3xl p-8 md:p-10 shadow-sm">
                  <h2 className="text-2xl font-black text-foreground mb-1">Send an Enquiry</h2>
                  <p className="text-sm text-muted-foreground mb-7">We&apos;ll reply on WhatsApp within a few hours.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">Name <span className="text-destructive">*</span></label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Rahul Sharma" className={INPUT} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-foreground">Phone <span className="text-destructive">*</span></label>
                        <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="98765 43210" className={INPUT} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com" className={INPUT} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">I&apos;m Looking For</label>
                      <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} title="Property type" className={INPUT}>
                        <option value="">Select a category...</option>
                        {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Message</label>
                      <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Budget, preferred location, BHK size, timeline — anything helps us assist you faster."
                        className={`${INPUT} resize-none`} />
                    </div>

                    <button type="submit"
                      className="flex items-center justify-center gap-2.5 w-full bg-primary text-primary-foreground font-bold text-[15px] py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md mt-1">
                      <MessageCircle className="h-5 w-5" />
                      Send via WhatsApp
                    </button>
                    <p className="text-xs text-muted-foreground text-center -mt-1">
                      Opens WhatsApp with your message pre-filled. Your data is never stored.
                    </p>
                  </form>
                </div>
              </div>

              {/* ── SIDEBAR ── */}
              <div className="lg:col-span-2 flex flex-col gap-5">

                {/* Map */}
                <div className="rounded-3xl overflow-hidden border-2 border-border h-[220px] shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d73.1909!3d19.1969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f0b2c4d0a5c9%3A0x1a2b3c4d5e6f7890!2sAmbernath+West%2C+Maharashtra+421505!5e0!3m2!1sen!2sin!4v1000000000000"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office" />
                </div>

                {/* Info rows */}
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-sm divide-y divide-border">
                  {[
                    { icon: MapPin, label: "Address", value: "Shop No. 6, Vallabh Bldg,\nAvdhoot Residency,\nAmbernath-West 421505", href: "https://maps.google.com/?q=Ambernath+West+421505" },
                    { icon: Phone, label: "Phone", value: "7767805544  ·  9168588575", href: "tel:7767805544" },
                    { icon: Mail, label: "Email", value: "shreebalajienterprisesamb\n@gmail.com", href: "mailto:shreebalajienterprisesamb@gmail.com" },
                    { icon: Clock, label: "Hours", value: "Mon–Sat  9AM – 7PM\nSunday  10AM – 5PM", href: null },
                    { icon: Shield, label: "RERA", value: "Registered · A51700023633", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 px-6 py-4 group hover:bg-muted/40 transition-colors">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                        <item.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{item.value}</p>
                      </div>
                      {item.href && (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-1">
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
