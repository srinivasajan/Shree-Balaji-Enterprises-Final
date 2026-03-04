"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Phone, Mail, MapPin, Clock, CheckCircle2, MessageSquare, Send, Shield
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["7767805544", "9168588575"],
    action: { label: "Call Now", href: "tel:7767805544" },
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    lines: ["Chat instantly with our team", "Quick responses guaranteed"],
    action: { label: "Open WhatsApp", href: "https://wa.me/917767805544?text=Hello%2C%20I%20have%20an%20enquiry." },
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["shreebalajienterprisesamb@gmail.com"],
    action: { label: "Send Email", href: "mailto:shreebalajienterprisesamb@gmail.com" },
  },
  {
    icon: MapPin,
    title: "Office",
    lines: ["Shop No. 6, Vallabh Bldg,", "Avdhoot Residency, Ambernath-West,", "Maharashtra 421505"],
    action: { label: "Get Directions", href: "https://maps.google.com/?q=Ambernath+West+421505" },
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
    // Build WhatsApp message with form data
    const msg = encodeURIComponent(
      `Hello, I am ${form.name}.\n\nInterest: ${form.interest || "General Enquiry"}\n\nMessage: ${form.message || "Please contact me."}\n\nContact: ${form.phone || form.email}`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:py-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Contact Us</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            Let&apos;s Find Your Perfect Property
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg">
            Reach out to our team for property enquiries, site visits, or any real estate advice.
            We respond to all queries within a few hours.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-center h-11 w-11 rounded-full bg-primary/10 mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <div className="flex flex-col gap-1 mb-4">
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-xs text-muted-foreground leading-relaxed">{line}</p>
                  ))}
                </div>
                <a
                  href={item.action.href}
                  target={item.action.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {item.action.label} →
                </a>
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enquiry Form */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-1">Send Us an Enquiry</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill in the details below and we&apos;ll get back to you on WhatsApp or phone.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-card border border-border rounded-xl">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Enquiry Sent!</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                    Your enquiry has been forwarded to our WhatsApp. We&apos;ll respond shortly.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => setSubmitted(false)} variant="outline">New Enquiry</Button>
                    <Link href="/buy"><Button>Browse Properties</Button></Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Your Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Rahul Sharma"
                        className="w-full px-3 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="w-full px-3 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">I am interested in</label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full px-3 py-3 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      title="Property type of interest"
                    >
                      <option value="">Select property type...</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Your Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us your budget, preferred location, BHK requirements, etc."
                      className="w-full px-3 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Enquiry via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    This will open WhatsApp with your enquiry pre-filled.
                  </p>
                </form>
              )}
            </div>

            {/* Office info + hours */}
            <div className="w-full lg:w-[360px] shrink-0 flex flex-col gap-4">
              {/* Map embed */}
              <div className="rounded-xl overflow-hidden border border-border h-[240px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d73.1909!3d19.1969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f0b2c4d0a5c9%3A0x1a2b3c4d5e6f7890!2sAmbernath+West%2C+Maharashtra+421505!5e0!3m2!1sen!2sin!4v1000000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Shree Balaji Enterprises office location"
                />
              </div>

              {/* Business hours */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Business Hours</h3>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
                    { day: "Sunday", time: "10:00 AM – 5:00 PM" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{h.day}</span>
                      <span className="font-semibold text-foreground">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    For urgent queries, WhatsApp us anytime — we try to respond within the hour.
                  </p>
                </div>
              </div>

              {/* RERA */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">RERA Registered Agency</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Reg No: A51700023633</p>
                  <p className="text-xs text-muted-foreground mt-1">All transactions are compliant with the Real Estate (Regulation and Development) Act, 2016.</p>
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
