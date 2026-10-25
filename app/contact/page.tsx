"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"

const engagementCategories = [
  { id: "residential", label: "Residential Acquisition" },
  { id: "commercial", label: "Commercial / Office Suite" },
  { id: "disposition", label: "Property Disposition (Sell)" },
  { id: "tenancy", label: "Tenancy & Leasing" },
  { id: "mortgage", label: "Mortgage Facilitation" },
  { id: "inspection", label: "Private Site Inspection" },
]

function ContactFormDossier() {
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
  const [copiedCoordinates, setCopiedCoordinates] = useState(false)

  useEffect(() => {
    if (initialType) {
      const match = engagementCategories.find(
        (c) =>
          c.label.toLowerCase().includes(initialType.toLowerCase()) ||
          c.id === initialType.toLowerCase()
      )
      if (match) setCategory(match.id)
    }
    if (initialProp) {
      setSpecifications(`Client reference regarding property portfolio record: ${initialProp}`)
    }
  }, [initialProp, initialType])

  const handleCopyChambers = () => {
    navigator.clipboard.writeText(
      "Shree Balaji Enterprises, Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West, Maharashtra 421505"
    )
    setCopiedCoordinates(true)
    setTimeout(() => setCopiedCoordinates(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setIsSubmitting(true)
    const selectedCategory =
      engagementCategories.find((c) => c.id === category)?.label || "General Advisory"

    saveInquiry({
      id: nextInquiryId(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      interest: selectedCategory,
      message: specifications.trim() || "Private consultation requested.",
      status: "new",
      date: new Date().toISOString(),
    })

    if (viaWhatsApp) {
      const text = encodeURIComponent(
        `[Private Consultation Request]\n\nClient Name: ${name.trim()}\nContact: ${phone.trim()}${email ? `\nEmail: ${email.trim()}` : ""}\nEngagement Scope: ${selectedCategory}\nSpecifications: ${specifications.trim() || "Requesting advisory session."}\n\nTo: Shree Balaji Enterprises (MahaRERA: A51700023633)`
      )
      window.open(`https://wa.me/917767805544?text=${text}`, "_blank")
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 350)
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
      {/* ── Institutional Header ────────────────────────────────────── */}
      <header className="border-b border-border/80 bg-card/60">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-8 pt-12 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground pb-4 border-b border-border/60">
            <span>Shree Balaji Enterprises &bull; Client Advisory Chambers</span>
            <span className="text-foreground font-semibold">MahaRERA Reg. Certificate: A51700023633</span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-foreground leading-[1.15]">
              Institutional Property Advisory &amp; Client Representation
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Direct consultation for acquisitions, property disposition, commercial leasing, and mortgage facilitation across Ambernath, Badlapur, and the Mumbai Metropolitan Region.
            </p>
          </div>

          {/* Institutional Contact Pillars (Clean Rule Grid, No Bubbly Cards) */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/80 border-t border-b border-border/80 py-4">
            <div className="py-3 md:py-0 md:pr-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground block">Registered Chambers</span>
              <p className="text-xs text-foreground font-medium mt-1 leading-relaxed">
                Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West 421505
              </p>
            </div>
            <div className="py-3 md:py-0 md:px-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground block">Principal Telephone Lines</span>
              <p className="text-xs text-foreground font-medium mt-1">
                <a href="tel:7767805544" className="hover:underline font-mono">+91 7767805544</a> &bull; <a href="tel:9168588575" className="hover:underline font-mono">+91 9168588575</a>
              </p>
            </div>
            <div className="py-3 md:py-0 md:pl-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground block">Advisory Desk</span>
              <p className="text-xs text-foreground font-medium mt-1">
                <a href="mailto:shreebalajienterprisesamb@gmail.com" className="hover:underline font-mono">shreebalajienterprisesamb@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Section: Form & Chambers Dossier ──────────────────── */}
      <section className="mx-auto max-w-[1140px] px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Formal Advisory Dossier Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-border/80 rounded-lg p-6 sm:p-8 bg-card/40">
              <div className="pb-6 border-b border-border/60">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground block">
                  Confidential Intake
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-1">
                  Advisory Request Dossier
                </h2>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  Submit engagement specifications below. A licensed senior advisor will review your criteria and present verified title options.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-600 block">
                    Transmission Received
                  </span>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Consultation Scheduled, {name}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Your advisory file has been logged into our chambers registry. An authorized partner will contact you directly on <strong className="font-mono text-foreground">{phone}</strong>.
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 border border-border/80 rounded hover:bg-muted font-medium transition-colors"
                    >
                      Submit Another Filing
                    </button>
                    <Link
                      href="/buy"
                      className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 font-medium transition-colors"
                    >
                      Examine Portfolio Listings &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6 pt-6">

                  {/* Section I: Engagement Classification */}
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-2.5">
                      I. Engagement Classification
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {engagementCategories.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCategory(c.id)}
                          className={`p-2.5 rounded border text-left text-xs transition-all ${
                            category === c.id
                              ? "border-slate-900 bg-slate-900 text-white font-medium"
                              : "border-border/80 bg-background text-muted-foreground hover:border-slate-400 hover:text-foreground"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section II: Client Identification */}
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-2.5">
                      II. Client Identification
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-foreground block mb-1">
                          Full Legal Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Individual or Corporate Entity"
                          className="w-full px-3 py-2 border border-border/80 rounded bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground block mb-1">
                          Direct Contact Number <span className="text-destructive">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-xs font-mono text-muted-foreground pointer-events-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Primary Mobile"
                            className="w-full pl-11 pr-3 py-2 border border-border/80 rounded bg-background text-sm text-foreground font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="text-xs font-medium text-foreground block mb-1">
                        Corporate / Personal Email <span className="text-muted-foreground font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@organization.com"
                        className="w-full px-3 py-2 border border-border/80 rounded bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  {/* Section III: Engagement Specifications */}
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block mb-2.5">
                      III. Engagement Specifications
                    </span>
                    <textarea
                      rows={4}
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="Specify parameters: Target micro-market, capital budget, unit configuration (BHK / carpet area), commercial requirements, or desired inspection dates..."
                      className="w-full px-3 py-2 border border-border/80 rounded bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all resize-none"
                    />
                  </div>

                  {/* Submission Row */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing Submission..." : "Submit Advisory Dossier"}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      className="text-xs text-muted-foreground hover:text-foreground underline decoration-border hover:decoration-foreground transition-colors text-center sm:text-right"
                    >
                      Or initiate direct WhatsApp transmission &rarr;
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-muted-foreground pt-2 border-t border-border/60">
                    Client Confidentiality Guaranteed &bull; Zero Third-Party Syndication &bull; MahaRERA: A51700023633
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Chambers Dossier & Compliance Seal (5 cols) */}
          <div className="lg:col-span-5 space-y-8">

            {/* Chambers Coordinates Card */}
            <div className="border border-border/80 rounded-lg p-6 bg-card/40 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground block">
                Chambers Location
              </span>
              <h3 className="text-base font-semibold text-foreground">
                Shree Balaji Enterprises Headquarters
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Shop No. 6, Vallabh Building, Avdhoot Residency,<br />
                Opp. Shiv Mandir Road, Ambernath-West,<br />
                District Thane, Maharashtra &ndash; 421505
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-border/60 text-xs font-mono">
                <button
                  type="button"
                  onClick={handleCopyChambers}
                  className="text-foreground hover:underline"
                >
                  {copiedCoordinates ? "Coordinates Copied &check;" : "Copy Address Dossier"}
                </button>
                <a
                  href="https://maps.app.goo.gl/xESVmiEK2GtM3XBDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>

            {/* Satellite Coordinates Preview */}
            <div className="border border-border/80 rounded-lg overflow-hidden h-52 relative bg-muted/20">
              <iframe
                src="https://maps.google.com/maps?q=19.1895593,73.2230161&z=17&output=embed"
                width="100%"
                height="100%"
                className="border-0 w-full h-full grayscale-[30%] contrast-[1.05]"
                allowFullScreen
                loading="lazy"
                title="Shree Balaji Enterprises Location Coordinates"
              />
              <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-xs border border-border/80 px-2 py-1 text-[10px] font-mono text-muted-foreground">
                GEO: 19.1896° N, 73.2230° E
              </div>
            </div>

            {/* Corporate Operating Schedule & Governance */}
            <div className="border border-border/80 rounded-lg p-6 bg-card/40 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground block">
                Consultation Protocol
              </span>

              <div className="space-y-2 text-xs border-b border-border/60 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Chambers Consultation:</span>
                  <span className="font-mono text-foreground">Monday &ndash; Sunday, 09:00 &ndash; 21:00 IST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Accompanied Site Escort:</span>
                  <span className="font-mono text-foreground">10:00 &ndash; 18:30 IST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Consultation Retainer:</span>
                  <span className="font-mono text-foreground font-semibold">Zero Advance Fee</span>
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground space-y-2 leading-relaxed">
                <p>
                  <strong>Statutory Brokerage Registration:</strong> MahaRERA Certificate No. <strong>A51700023633</strong>. All property listings subject to verified title search and developer approvals.
                </p>
              </div>
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
        <div className="min-h-screen flex items-center justify-center text-xs font-mono text-muted-foreground">
          Loading client advisory portal...
        </div>
      }
    >
      <ContactFormDossier />
    </Suspense>
  )
}
