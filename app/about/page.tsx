import Image from "next/image"
import Link from "next/link"
import {
  Shield, MapPin, Phone, Mail,
  Award, CheckCircle2, Building2, Heart,
  Star, MessageCircle, Sparkles, TrendingUp, Users, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "15+", label: "Years of Experience", icon: Clock },
  { value: "500+", label: "Properties Sold", icon: Building2 },
  { value: "1000+", label: "Happy Clients", icon: Users },
  { value: "13+", label: "Cities Covered", icon: MapPin },
]

const timeline = [
  { year: "2010", title: "Founded in Ambernath", desc: "Started as a small office in Ambernath-West with one mission — make real estate honest and simple." },
  { year: "2014", title: "Expanded Across MMR", desc: "Grew our presence across the Kalyan–Badlapur belt, becoming the go-to agency for first-time buyers." },
  { year: "2018", title: "500+ Families Served", desc: "Crossed 500 successful transactions, earned RERA registration and deep trust across the region." },
  { year: "2026", title: "1000+ Happy Clients", desc: "Today we serve clients across 13+ cities with the same honest, personal approach that started it all." },
]

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description: "No hidden charges, no false promises. Every transaction is fully transparent from day one.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "We listen, understand your budget, and work until you find exactly the right property.",
  },
  {
    icon: Award,
    title: "RERA Compliant",
    description: "Registered under RERA (Reg No: A51700023633) — every deal follows the law and protects your rights.",
  },
  {
    icon: Building2,
    title: "End-to-End Support",
    description: "Property search, site visits, loan assistance, registration — all handled under one roof.",
  },
]

const services = [
  "Residential (Flats, Bungalows, Row Houses)",
  "Commercial (Shops, Offices, Showrooms)",
  "Industrial (Warehouses, Godowns, Sheds)",
  "Plots & Land (Residential & Commercial)",
  "Home Loan Assistance",
  "Legal Documentation Support",
  "Property Valuation",
  "Site Visits & Advisory",
]

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://raw.githubusercontent.com/srinivasajan/shreebalajienterprises/main/images/locations/ambernath.jpg"
            alt="Ambernath city — home of Shree Balaji Enterprises"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/65 to-foreground/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-20 md:py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              RERA Reg No: A51700023633
            </div>

            <h1 className="text-4xl md:text-[56px] font-black text-white leading-[1.05] tracking-tight mb-5">
              Built on Trust.<br />
              <span className="text-primary">Driven by Results.</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl leading-relaxed mb-9">
              Ambernath&apos;s most trusted RERA‑registered real estate agency. Since 2010 we&apos;ve
              helped 1000+ families and businesses find their perfect property across the Mumbai
              Metropolitan Region.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/contact">
                <Button size="lg" className="h-12 px-7 text-sm font-bold shadow-lg shadow-primary/30">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/buy">
                <Button size="lg" variant="outline" className="h-12 px-7 text-sm font-bold border-white/30 text-white hover:bg-white/10">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-foreground">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-8 gap-1 text-center">
                <s.icon className="h-4 w-4 text-primary mb-1" />
                <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/45 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY + FOUNDER ──────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col lg:flex-row gap-14 xl:gap-20 items-start">

            {/* Left — Story */}
            <div className="flex-1 min-w-0">
              <p className="text-primary text-xs font-extrabold uppercase tracking-[0.2em] mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-6">
                Ambernath&apos;s Real Estate<br />Partner Since 2010
              </h2>

              <div className="flex flex-col gap-5 text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  What started as a small office in Ambernath-West has grown into one of the most trusted
                  real estate agencies across the Mumbai Metropolitan Region. Our foundation was simple —
                  be honest, be available, and always put the client first.
                </p>
                <p>
                  Over 15+ years we&apos;ve guided more than 1,000 families through some of the biggest
                  financial decisions of their lives — from a first 1BHK flat to large commercial
                  warehouses. Our deep roots in Ambernath, Badlapur, Ulhasnagar, Thane and beyond give us
                  a local edge no national portal can match.
                </p>
                <p>
                  Every deal we handle meets the highest legal standards. Fully registered under RERA
                  (Reg No: A51700023633). With Shree Balaji Enterprises, you&apos;re not just finding
                  a property — you&apos;re finding a partner for life.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <a href="tel:7767805544">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" /> Call Us
                  </Button>
                </a>
                <a href="https://wa.me/917767805544" target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Right — Founder card */}
            <div className="w-full lg:w-[340px] shrink-0" id="founder">
              <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
                <div className="relative h-44 w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Image
                    src="https://raw.githubusercontent.com/srinivasajan/shreebalajienterprises/main/images/logo.png"
                    alt="Shree Balaji Enterprises"
                    width={120}
                    height={120}
                    className="object-contain drop-shadow"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-lg font-black text-foreground">Anju Jangiti</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-foreground">5.0</span>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-semibold mb-4">Founder &amp; Director</p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[{ v: "15+", l: "Yrs Exp" }, { v: "500+", l: "Sold" }, { v: "1000+", l: "Clients" }].map((s) => (
                      <div key={s.l} className="bg-muted/60 rounded-xl py-2.5 text-center">
                        <p className="text-sm font-black text-primary">{s.v}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href="https://wa.me/917767805544?text=Hi%20Anju%2C%20I%20found%20your%20profile%20on%20the%20website.%20I%20would%20like%20to%20discuss%20my%20property%20requirements."
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp Anju
                    </a>
                    <a
                      href="tel:7767805544"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-border text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" /> 7767805544
                    </a>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                    <a href="mailto:anjujangiti@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-3.5 w-3.5 shrink-0" /> anjujangiti@gmail.com
                    </a>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath‑West 421505</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-foreground">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.2em] mb-3">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              From a Small Office to MMR&apos;s Most Trusted
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-7 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {timeline.map((t) => (
                <div key={t.year} className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground text-xs font-black shrink-0 mb-4 shadow-lg shadow-primary/25 z-10">
                    {t.year}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{t.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.2em] mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES + CTA ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col lg:flex-row gap-14 items-start">

            <div className="flex-1 min-w-0">
              <p className="text-primary text-xs font-extrabold uppercase tracking-[0.2em] mb-3">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-8">
                Complete Real Estate<br />Solutions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-foreground rounded-3xl p-8 text-white">
                <TrendingUp className="h-7 w-7 text-primary mb-4" />
                <h3 className="text-2xl font-black mb-2 leading-tight">
                  Ready to Find<br />Your Property?
                </h3>
                <p className="text-sm text-white/55 mb-7 leading-relaxed">
                  Our team is available 6 days a week. One call or message is all it takes.
                </p>

                <div className="flex flex-col gap-2.5 mb-7">
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    7767805544 / 9168588575
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/75">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    shreebalajienterprisesamb@gmail.com
                  </div>
                  <div className="flex items-start gap-3 text-sm text-white/75">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath‑West 421505
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href="https://wa.me/917767805544"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full py-3 rounded-xl border-2 border-white/20 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                  >
                    Send Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RERA TRUST BAR ───────────────────────────────────── */}
      <section className="py-10 border-t border-border">
        <div className="mx-auto max-w-[1280px] px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-11 w-11 rounded-full bg-primary/10 shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">RERA Registered Agency</p>
              <p className="text-xs text-muted-foreground">Reg No: A51700023633 · Maharashtra Real Estate Regulatory Authority</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            {["Zero hidden charges", "Legal documentation support", "Transparent valuations"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
