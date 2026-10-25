"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Phone, Mail, MapPin, MessageSquare, Check, Copy, ExternalLink, Send } from "lucide-react"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

const enquiryCategories = [
  { id: "residential", label: "Buy Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "disposition", label: "Sell Property" },
  { id: "tenancy", label: "Rent / Lease" },
  { id: "mortgage", label: "Home Loan" },
  { id: "inspection", label: "Site Visit" },
]

function ContactForm() {
  const searchParams = useSearchParams()
  const initialProp = searchParams.get("property") || searchParams.get("ref") || ""
  const initialType = searchParams.get("type") || ""

  const [category, setCategory] = useState("residential")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [specifications, setSpecifications] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  useEffect(() => {
    if (initialType) {
      const match = enquiryCategories.find(
        (c) =>
          c.label.toLowerCase().includes(initialType.toLowerCase()) ||
          c.id === initialType.toLowerCase()
      )
      if (match) setCategory(match.id)
    }
    if (initialProp) {
      setSpecifications(`Enquiry regarding property: ${initialProp}`)
    }
  }, [initialProp, initialType])

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      "Shop No. 6, Vallabh Building, Avdhoot Residency, Opp. Shiv Mandir Road, Ambernath-West, District Thane, Maharashtra – 421505"
    )
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setIsSubmitting(true)
    const selectedCategory =
      enquiryCategories.find((c) => c.id === category)?.label || "General Enquiry"

    saveInquiry({
      id: nextInquiryId(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      interest: selectedCategory,
      message: specifications.trim() || "General enquiry.",
      status: "new",
      date: new Date().toISOString(),
    })

    if (viaWhatsApp) {
      const text = encodeURIComponent(
        `Hi Shree Balaji Enterprises,\n\nName: ${name.trim()}\nPhone: ${phone.trim()}${email ? `\nEmail: ${email.trim()}` : ""}\nInterest: ${selectedCategory}\nMessage: ${specifications.trim() || "Interested in your properties."}`
      )
      window.open(`https://wa.me/917767805544?text=${text}`, "_blank")
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 300)
  }

  const handleReset = () => {
    setName("")
    setPhone("")
    setEmail("")
    setSpecifications("")
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Direct Header ────────────────────────────────────────── */}
      <section className="border-b border-border bg-card/50 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">
            Have questions or need assistance? Reach out to our team in Ambernath or send us an enquiry below.
          </p>
        </div>
      </section>

      {/* ── Main Section ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Contact Information & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
              <h2 className="text-xl font-bold text-foreground">Get in Touch</h2>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</p>
                  <div className="mt-0.5 space-y-0.5">
                    <div>
                      <a href="tel:+917767805544" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                        +91 7767805544
                      </a>
                    </div>
                    <div>
                      <a href="tel:+919168588575" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                        +91 9168588575
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                  <a
                    href="mailto:shreebalajienterprisesamb@gmail.com"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors break-all"
                  >
                    shreebalajienterprisesamb@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Office Address</p>
                  <p className="text-sm text-foreground leading-relaxed mt-0.5">
                    Shop No. 6, Vallabh Building, Avdhoot Residency, Opp. Shiv Mandir Road, Ambernath-West, District Thane, Maharashtra &ndash; 421505
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-foreground transition-colors cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                    <a
                      href="https://maps.app.goo.gl/xESVmiEK2GtM3XBDA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-foreground transition-colors"
                    >
                      <span>Directions</span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action */}
              <div className="pt-2 border-t border-border">
                <a
                  href="https://wa.me/917767805544?text=Hi%20Shree%20Balaji%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20properties."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Map Preview */}
            <div className="rounded-2xl border border-border overflow-hidden h-56 bg-muted relative shadow-xs">
              <iframe
                src="https://maps.google.com/maps?q=19.1895593,73.2230161&z=17&output=embed"
                width="100%"
                height="100%"
                className="border-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                title="Shree Balaji Enterprises Location Map"
              />
            </div>

            {/* Discreet MahaRERA compliance note */}
            <p className="text-xs text-muted-foreground text-center sm:text-left px-1">
              MahaRERA Registration No: <span className="font-semibold text-foreground">A51700023633</span>
            </p>
          </div>

          {/* Right: Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-foreground">Send an Enquiry</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-6">
                Fill out the form and our team will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Thank You, {name}!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Your enquiry has been received. Our team will contact you shortly on{" "}
                    <strong className="text-foreground">{phone}</strong>.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 border border-border rounded-xl hover:bg-muted font-medium text-foreground transition-colors cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                    <Link
                      href="/buy"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-medium transition-colors"
                    >
                      Browse Properties &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5">
                  {/* Category Pills */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      I am interested in
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {enquiryCategories.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(c.id)}
                          className={`px-3 py-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                            category === c.id
                              ? "border-primary bg-primary text-primary-foreground shadow-xs"
                              : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-semibold text-foreground block mb-1.5">
                        Your Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-foreground block mb-1.5">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-sm font-medium text-muted-foreground pointer-events-none">
                          +91
                        </span>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9876543210"
                          className="w-full pl-12 pr-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="text-xs font-semibold text-foreground block mb-1.5">
                      Email Address <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Message / Requirements */}
                  <div>
                    <label htmlFor="contact-message" className="text-xs font-semibold text-foreground block mb-1.5">
                      Message / Requirements <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="Tell us what you're looking for (e.g., 2 BHK in Ambernath-East, budget ₹45 Lakhs)..."
                      className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? "Sending..." : "Submit Enquiry"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4 text-emerald-600" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
          Loading contact page...
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  )
}
