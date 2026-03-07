"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, CheckCircle2, Shield, ArrowUpRight } from "lucide-react"
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
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Us
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

              {/* Form ÔÇö 3 cols */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-black text-foreground mb-6">Send an Enquiry</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Name <span className="text-destructive">*</span></label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Phone <span className="text-destructive">*</span></label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Your phone number"
                        className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Your email address"
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
                      placeholder="Your budget, preferred location, BHK size..."
                      className="px-4 py-3 text-sm border-2 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none transition-colors" />
                  </div>
                  <button type="submit"
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-2xl hover:opacity-90 transition-opacity mt-1">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Send via WhatsApp
                  </button>
                  <p className="text-xs text-muted-foreground text-center -mt-2">
                    Opens WhatsApp with your message pre-filled. We never store your data.
                  </p>
                </form>
              </div>

              {/* Sidebar ÔÇö 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border-2 border-border h-52">
                  <iframe
                    src="https://maps.google.com/maps?q=19.1895593,73.2230161&z=17&output=embed"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Shree Balaji Enterprises Office" />
                </div>
                <a
                  href="https://maps.app.goo.gl/xESVmiEK2GtM3XBDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-border py-3 text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>

                {/* Info list */}
                <div className="flex flex-col divide-y divide-border border-2 border-border rounded-2xl overflow-hidden">
                  {[
                    { icon: MapPin, label: "Address", value: "Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West 421505", href: "https://maps.app.goo.gl/xESVmiEK2GtM3XBDA" },
                    { icon: Clock, label: "Hours", value: "Everyday 9AM – 9PM", href: null },
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

    </>
  )
}
