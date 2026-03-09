import Image from "next/image"
import Link from "next/link"
import {
  Shield, MapPin, Phone, Mail,
  Award, CheckCircle2, Building2, Heart,
  Star, TrendingUp, Users, Clock, ArrowRight, Handshake
} from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "15+", label: "Years Active", sub: "Since 2010", icon: Clock },
  { value: "500+", label: "Properties Sold", sub: "Across MMR", icon: Building2 },
  { value: "1000+", label: "Happy Clients", sub: "& counting", icon: Users },
  { value: "13+", label: "Cities Covered", sub: "Across Maharashtra", icon: MapPin },
]

const milestones = [
  { year: "2010", title: "Founded in Ambernath", desc: "One desk, one phone, one mission — make property deals honest and simple for everyday people." },
  { year: "2014", title: "Expanded Across MMR", desc: "Grew across the Kalyan–Badlapur belt. Became the go-to agency for first-time homebuyers in the region." },
  { year: "2018", title: "RERA Registration", desc: "Earned RERA Reg A51700023633. 500+ transactions built on full transparency and client trust." },
  { year: "2026", title: "1000+ Families Served", desc: "Serving 13+ cities with the same honest, personal approach that started it all in 2010." },
]

const values = [
  { icon: Shield, title: "Integrity First", description: "No hidden charges, no false promises. Every transaction fully transparent from day one." },
  { icon: Heart, title: "Client-Centric", description: "We listen, understand your budget, and work until you find exactly the right property." },
  { icon: Award, title: "RERA Compliant", description: "Registered under RERA (A51700023633) — every deal follows the law and protects your rights." },
  { icon: Handshake, title: "End-to-End Support", description: "Property search, site visits, loan assistance, registration — all under one roof." },
]

const services = [
  { label: "Residential", desc: "Flats, Bungalows, Row Houses" },
  { label: "Commercial", desc: "Shops, Offices, Showrooms" },
  { label: "Industrial", desc: "Warehouses, Godowns, Sheds" },
  { label: "Plots & Land", desc: "Residential & Commercial" },
  { label: "Home Loans", desc: "All major banks covered" },
  { label: "Documentation", desc: "Legal paperwork support" },
  { label: "Valuation", desc: "Fair & accurate pricing" },
  { label: "Site Visits", desc: "Guided property tours" },
]

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[560px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Real estate in Ambernath, Maharashtra"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 pt-32 pb-16 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <Shield className="h-3.5 w-3.5" />
                RERA Reg: A51700023633
              </div>
              <h1 className="text-4xl md:text-[60px] font-black text-white leading-[1.0] tracking-tight mb-4">
                Ambernath&apos;s Most<br />
                <span className="text-primary">Trusted Agency.</span>
              </h1>
              <p className="text-base text-white/60 max-w-lg leading-relaxed">
                15+ years, 1000+ families, one goal — make real estate honest, simple and
                stress‑free across the Mumbai Metropolitan Region.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/contact">
                <Button size="lg" className="h-12 px-7 text-sm font-bold shadow-lg shadow-primary/30">
                  Talk to Us <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/buy">
                <Button size="lg" variant="outline" className="h-12 px-7 text-sm font-bold bg-white/10 border-white/60 text-white hover:bg-white/20 hover:border-white">
                  View Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="py-10 border-b border-border bg-card">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 gap-0.5 text-center bg-card">
                <s.icon className="h-5 w-5 text-primary mb-2" />
                <p className="text-3xl md:text-4xl font-black text-foreground">{s.value}</p>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY + FOUNDER ──────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left — Story */}
            <div>
              <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Our Story</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-8">
                Built From the Ground Up.<br />
                <span className="text-muted-foreground font-light italic">Just Like Your Home.</span>
              </h2>

              <div className="flex flex-col gap-5 text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  What started as a small office in Ambernath-West has grown into one of the most trusted
                  real estate agencies across the Mumbai Metropolitan Region. Our foundation was simple —
                  be honest, be available, always put the client first.
                </p>
                <p>
                  Over 15+ years we&apos;ve guided more than 1,000 families through some of the biggest
                  financial decisions of their lives — from a first 1BHK flat to large commercial
                  warehouses. Our deep roots in Ambernath, Badlapur, Ulhasnagar, Thane and beyond give us
                  a local edge no national portal can match.
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-8 pl-5 border-l-4 border-primary">
                <p className="text-base md:text-lg font-semibold text-foreground leading-snug italic">
                  &ldquo;We don&apos;t just sell properties. We help people find the place they&apos;ll call home.&rdquo;
                </p>
                <p className="mt-2 text-sm text-muted-foreground font-medium">— Anju Jangiti, Founder</p>
              </div>

              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <a href="tel:7767805544">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" /> Call Us
                  </Button>
                </a>
                <a href="https://wa.me/917767805544" target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Right — Founder card */}
            <div className="flex justify-center lg:justify-end" id="founder">
              <div className="w-full max-w-[360px] rounded-3xl overflow-hidden border border-border bg-card shadow-2xl">
                <div className="relative h-52 w-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center">
                  <Image
                    src="https://raw.githubusercontent.com/srinivasajan/shreebalajienterprises/main/images/logo.png"
                    alt="Shree Balaji Enterprises"
                    width={130}
                    height={130}
                    className="object-contain drop-shadow-md"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 border border-border rounded-full px-2.5 py-1 text-xs font-bold text-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" /> 5.0
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-foreground">Anju Jangiti</h3>
                  <p className="text-sm text-primary font-bold mt-0.5 mb-5">Founder &amp; Director</p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[{ v: "15+", l: "Yrs Exp" }, { v: "500+", l: "Sold" }, { v: "1000+", l: "Clients" }].map((s) => (
                      <div key={s.l} className="rounded-xl bg-muted/50 py-3 text-center">
                        <p className="text-sm font-black text-primary">{s.v}</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mb-5">
                    <a
                      href="https://wa.me/917767805544?text=Hi%20Anju%2C%20I%20found%20your%20profile%20on%20the%20website.%20I%20would%20like%20to%20discuss%20my%20property%20requirements."
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground transition-all hover:opacity-90"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Anju
                    </a>
                    <a
                      href="tel:7767805544"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-border text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" /> 77678 05544
                    </a>
                  </div>

                  <div className="pt-4 border-t border-border flex flex-col gap-2">
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

      {/* ── MILESTONES ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-3">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              From One Office to MMR&apos;s Most Trusted
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {milestones.map((m) => (
              <div key={m.year} className="bg-card border border-border rounded-2xl p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary mb-3">{m.year}</p>
                <h3 className="text-base font-bold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl transition-all duration-200 cursor-default">
                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 group-hover:bg-primary transition-all mb-5">
                  <v.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES + CTA ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-foreground">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            <div>
              <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-8">
                Complete Real Estate<br />Solutions Under One Roof
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <div key={s.label} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 hover:border-primary/50 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">{s.label}</p>
                      <p className="text-xs text-white/45">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 border border-border shadow-2xl">
              <TrendingUp className="h-8 w-8 text-primary mb-5" />
              <h3 className="text-2xl font-black text-foreground mb-2 leading-tight">
                Start Your<br />Property Journey
              </h3>
              <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
                Whether you&apos;re buying your first home, renting a space, or investing — we&apos;re
                here 6 days a week to guide you every step of the way.
              </p>

              <div className="flex flex-col gap-2.5 mb-7">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  7767805544 / 9168588575
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  shreebalajienterprisesamb@gmail.com
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath‑West 421505
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/917767805544"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full py-3 rounded-xl border-2 border-border text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Send an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RERA TRUST BAR ───────────────────────────────────── */}
      <section className="py-10 bg-primary/5 border-t border-primary/15">
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
