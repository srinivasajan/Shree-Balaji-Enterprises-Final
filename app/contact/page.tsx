"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Phone, Mail, MapPin, Clock, CheckCircle2, MessageSquare, Send, Shield,
  ArrowRight, Headphones,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["7767805544", "9168588575"],
    action: { label: "Call Now", href: "tel:7767805544" },
    color: "bg-blue-500",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    lines: ["Chat instantly with our team", "Quick responses guaranteed"],
    action: { label: "Open WhatsApp", href: "https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry." },
    color: "bg-green-500",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["shreebalajienterprisesamb@gmail.com"],
    action: { label: "Send Email", href: "mailto:shreebalajienterprisesamb@gmail.com" },
    color: "bg-violet-500",
  },
  {
    icon: MapPin,
    title: "Visit Office",
    lines: ["Shop No. 6, Vallabh Bldg,", "Avdhoot Residency, Ambernath-West,", "Maharashtra 421505"],
    action: { label: "Get Directions", href: "https://maps.google.com/?q=Ambernath+West+421505" },
    color: "bg-orange-500",
  },
]

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-20 md:py-28 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-6">
              <Headphones className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">We&apos;re Here to Help</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] mb-5 text-background">
              Let&apos;s Talk<br />
              <span className="text-primary">Real Estate.</span>
            </h1>
            <p className="text-base text-background/70 leading-relaxed max-w-md">
              Whether you&apos;re buying, selling, renting, or need a home loan — our team is just a call or message away. We respond fast.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:min-w-[280px]">
            <a href="tel:7767805544" className="flex items-center gap-4 bg-background/10 hover:bg-background/20 border border-background/20 rounded-2xl px-5 py-4 transition-colors group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-background/60 font-medium">Call Directly</p>
                <p className="text-base font-bold text-background">7767805544</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-background/40 group-hover:text-primary transition-colors" />
            </a>
            <a href="https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-2xl px-5 py-4 transition-colors group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-background/60 font-medium">WhatsApp Us</p>
                <p className="text-base font-bold text-background">Chat Instantly</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-background/40 group-hover:text-green-400 transition-colors" />
            </a>
            <a href="mailto:shreebalajienterprisesamb@gmail.com" className="flex items-center gap-4 bg-background/10 hover:bg-background/20 border border-background/20 rounded-2xl px-5 py-4 transition-colors group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-background/60 font-medium">Email Us</p>
                <p className="text-sm font-bold text-background truncate max-w-[180px]">shreebalajienterprisesamb</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-background/40 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-muted/40 border-b border-border">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} mb-4`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <div className="flex flex-col gap-0.5 mb-4">
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                  ))}
                </div>
                <a
                  href={item.action.href}
                  target={item.action.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  {item.action.label} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Enquiry Form</p>
              <h2 className="text-3xl font-black text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">Fill in your details and we&apos;ll forward your enquiry straight to our WhatsApp.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-primary/5 border border-primary/20 rounded-3xl">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-5">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2">Enquiry Sent!</h3>
                  <p className="text-muted-foreground mb-8 max-w-xs">Your enquiry has been forwarded to our WhatsApp. We&apos;ll respond shortly.</p>
                  <div className="flex gap-3">
                    <Button onClick={() => setSubmitted(false)} variant="outline">New Enquiry</Button>
                    <Link href="/buy"><Button>Browse Properties</Button></Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Your Name <span className="text-destructive">*</span></label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma"
                        className="w-full px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Phone Number <span className="text-destructive">*</span></label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98765 43210"
                        className="w-full px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"
                      className="w-full px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">I&apos;m Interested In</label>
                    <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} title="Property type"
                      className="w-full px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition">
                      <option value="">Select property type...</option>
                      {propertyTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your Message</label>
                    <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us your budget, preferred location, BHK requirements, timeline..."
                      className="w-full px-4 py-3.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 resize-none transition" />
                  </div>
                  <Button type="submit" size="lg" className="w-full text-base py-6 rounded-xl">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Opens WhatsApp with your enquiry pre-filled. Your data is never stored.</p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden border border-border h-[260px] shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d73.1909!3d19.1969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f0b2c4d0a5c9%3A0x1a2b3c4d5e6f7890!2sAmbernath+West%2C+Maharashtra+421505!5e0!3m2!1sen!2sin!4v1000000000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office location" />
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground">Our Office</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Shop No. 6, Vallabh Bldg,<br />Avdhoot Residency,<br />Ambernath-West, Maharashtra 421505
                </p>
                <a href="https://maps.google.com/?q=Ambernath+West+421505" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                  Open in Maps <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground">Business Hours</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
                    { day: "Sunday", time: "10:00 AM – 5:00 PM" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{h.day}</span>
                      <span className="text-sm font-bold text-foreground">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">For urgent queries, WhatsApp us anytime — we respond within the hour.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">RERA Registered Agency</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Reg No: A51700023633</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">All transactions comply with the Real Estate (Regulation and Development) Act, 2016.</p>
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
