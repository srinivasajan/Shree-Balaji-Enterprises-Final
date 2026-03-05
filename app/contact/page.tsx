"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, CheckCircle2, MessageCircle, Shield, ArrowUpRight } from "lucide-react"
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
    const msg = encodeURIComponent(`Hello, I am ${form.name}.\n\nInterest: ${form.interest || "General Enquiry"}\n\nMessage: ${form.message || "Please contact me."}\n\nContact: ${form.phone || form.email}`)
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <>
      <section className="bg-background pt-14 pb-20 px-4">
        <div className="mx-auto max-w-[1100px]">

          {/* Top heading */}
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4">Contact Us</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.0] tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              Our team in Ambernath is ready to help you find, buy, sell or rent your next property.
            </p>

            {/* Quick reach buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a href="tel:7767805544" className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-2.5 text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> 7767805544
              </a>
              <a href="https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-green-600 transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <a href="mailto:shreebalajienterprisesamb@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-2.5 text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> Email Us
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-12" />

          {/* Main content: form + sidebar */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-3">We got your message!</h2>
              <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
                Your enquiry was forwarded to our WhatsApp. We&apos;ll reach out within a few hours.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
                <Link href="/buy"><Button>Browse Properties</Button></Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">

              {/* Form — 3 cols */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-black text-foreground mb-6">Send an Enquiry</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Name <span className="text-destructive">*</span></label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Phone <span className="text-destructive">*</span></label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">I&apos;m Looking For</label>
                    <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} title="Property type"
                      className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-primary transition-colors">
                      <option value="">Select a category...</option>
                      {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Message</label>
                    <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us your budget, preferred location, BHK size, timeline..."
                      className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none transition-colors" />
                  </div>
                  <button type="submit"
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-2xl hover:opacity-90 transition-opacity mt-1">
                    <MessageCircle className="h-5 w-5" />
                    Send via WhatsApp
                  </button>
                  <p className="text-xs text-muted-foreground text-center -mt-2">
                    Opens WhatsApp with your message pre-filled. We never store your data.
                  </p>
                </form>
              </div>

              {/* Sidebar — 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border-2 border-border h-52">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d73.1909!3d19.1969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f0b2c4d0a5c9%3A0x1a2b3c4d5e6f7890!2sAmbernath+West%2C+Maharashtra+421505!5e0!3m2!1sen!2sin!4v1000000000000"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office" />
                </div>

                {/* Info list */}
                <div className="flex flex-col divide-y divide-border border-2 border-border rounded-2xl overflow-hidden">
                  {[
                    { icon: MapPin, label: "Address", value: "Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West 421505", href: "https://maps.google.com/?q=Ambernath+West+421505" },
                    { icon: Clock, label: "Hours", value: "Mon–Sat 9AM–7PM  ·  Sun 10AM–5PM", href: null },
                    { icon: Shield, label: "RERA", value: "Reg No: A51700023633", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 px-5 py-4">
                      <item.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                        <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                      </div>
                      {item.href && (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-primary hover:opacity-80">
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
