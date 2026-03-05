"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Phone, Mail, MapPin, Clock, CheckCircle2, MessageCircle,
  Shield, ArrowRight, Sparkles,
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

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    value: "7767805544",
    sub: "9168588575",
    href: "tel:7767805544",
    cta: "Call Now",
    accent: "bg-blue-600",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat Instantly",
    sub: "Quick responses, always",
    href: "https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry.",
    cta: "Message Us",
    accent: "bg-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "shreebalajienterprisesamb",
    sub: "@gmail.com",
    href: "mailto:shreebalajienterprisesamb@gmail.com",
    cta: "Send Email",
    accent: "bg-violet-600",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Ambernath West",
    sub: "Maharashtra 421505",
    href: "https://maps.google.com/?q=Ambernath+West+421505",
    cta: "Get Directions",
    accent: "bg-orange-500",
  },
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
      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
            alt="Contact Shree Balaji Enterprises"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 w-full mx-auto max-w-[1280px] px-4 pb-16 pt-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 bg-primary text-primary-foreground text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="h-3.5 w-3.5" />
              7-Day Response Guarantee · RERA Registered
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-5 tracking-tight">
              Let&apos;s Find Your<br />
              <span className="text-primary">Perfect Property.</span>
            </h1>
            <p className="text-base md:text-lg text-white/75 mb-8 max-w-lg leading-relaxed">
              Call, WhatsApp, or drop us a message — our team in Ambernath responds fast and guides you personally every step of the way.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-12 px-7 text-sm font-bold shadow-2xl gap-2">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us Now
                </Button>
              </a>
              <a href="tel:7767805544">
                <Button size="lg" variant="outline" className="h-12 px-7 text-sm font-bold bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                  <Phone className="h-4 w-4" /> 7767805544
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="py-12 border-b border-border bg-muted/30">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/40 transition-all"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c.accent}`}>
                  <c.icon className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{c.title}</p>
                  <p className="text-sm font-bold text-foreground truncate">{c.value}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.sub}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Enquiry Form */}
            <div className="flex-1">
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Get in Touch</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Send Us an Enquiry</h2>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-md">
                Tell us what you&apos;re looking for — we&apos;ll match you with the right property and get back to you on WhatsApp within hours.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-primary/5 border-2 border-primary/20 rounded-3xl">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-5">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8 max-w-xs text-sm">
                    Your enquiry is on its way to our WhatsApp. We&apos;ll be in touch very soon.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => setSubmitted(false)} variant="outline">New Enquiry</Button>
                    <Link href="/buy"><Button>Browse Properties</Button></Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Your Name <span className="text-destructive">*</span></label>
                      <input
                        type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Phone Number <span className="text-destructive">*</span></label>
                      <input
                        type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Email Address</label>
                    <input
                      type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">I&apos;m Looking For</label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      title="Property type"
                    >
                      <option value="">Select a category...</option>
                      {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Message</label>
                    <textarea
                      rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Budget, preferred area, BHK size, timeline — anything helps us find the right match faster."
                      className="px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-14 text-[15px] font-bold gap-2 rounded-xl">
                    <MessageCircle className="h-5 w-5" />
                    Send Enquiry via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Tapping submit opens WhatsApp with your message pre-filled. We never store your data.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-5">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border shadow h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d73.1909!3d19.1969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f0b2c4d0a5c9%3A0x1a2b3c4d5e6f7890!2sAmbernath+West%2C+Maharashtra+421505!5e0!3m2!1sen!2sin!4v1000000000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office location"
                />
              </div>

              {/* Address + Hours combined */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <p className="font-bold text-foreground">Our Office</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Shop No. 6, Vallabh Bldg, Avdhoot Residency,<br />
                    Ambernath-West, Maharashtra 421505
                  </p>
                  <a
                    href="https://maps.google.com/?q=Ambernath+West+421505"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Open in Google Maps <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <p className="font-bold text-foreground">Business Hours</p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
                      { day: "Sunday", time: "10:00 AM – 5:00 PM" },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span className="font-semibold text-foreground">{h.time}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                    WhatsApp us anytime for urgent queries — we reply within the hour.
                  </p>
                </div>
              </div>

              {/* RERA */}
              <div className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 mt-0.5">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">RERA Registered Agency</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">Reg No: A51700023633</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    All transactions comply with Maharashtra RERA, 2016. Your investment is safe with us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
