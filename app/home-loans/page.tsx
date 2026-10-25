"use client"

import Image from "next/image"
import {
  FileText, Handshake, UserCheck, Building2,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { InView } from "@/components/core/in-view"
import { AnimatedGroup } from "@/components/core/animated-group"

const steps = [
  {
    num: "01",
    icon: UserCheck,
    title: "Eligibility Check",
    description: "We review your income, CIBIL score and profile — and tell you honestly what you qualify for before you approach any bank.",
  },
  {
    num: "02",
    icon: Building2,
    title: "Bank Comparison",
    description: "We approach 4–6 banks simultaneously and bring you the best rate and terms — not just the first offer.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Document Handling",
    description: "We guide you on every document, review your file before submission, and make sure there are zero surprises.",
  },
  {
    num: "04",
    icon: Handshake,
    title: "End-to-End Follow-up",
    description: "We stay with you from application day to disbursement day — following up with the bank so you never have to wonder.",
  },
]

const stats = [
  { value: "500+", label: "Families Helped", sub: "Since 2008" },
  { value: "6+", label: "Partner Banks", sub: "All Major Lenders" },
  { value: "₹0", label: "Cost to You", sub: "Always Free" },
  { value: "RERA", label: "A51700023633", sub: "Verified Agency" },
]

const banks = [
  { name: "State Bank of India", logo: "/images/banks/sbi.svg" },
  { name: "HDFC Bank", logo: "/images/banks/hdfc.svg" },
  { name: "ICICI Bank", logo: "/images/banks/icici.svg" },
  { name: "Axis Bank", logo: "/images/banks/axis.svg" },
  { name: "LIC Housing Finance", logo: "/images/banks/lic-hfl.svg" },
  { name: "PNB Housing Finance", logo: "/images/banks/pnb-hfl.webp" },
]


export default function HomeLoansPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[520px] xl:min-h-[620px] 2xl:min-h-[700px] flex items-end">
        <div className="absolute inset-0">
          <Image src="/images/mortgage-hero.jpg" alt="Home loan assistance" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-16 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <Sparkles className="h-3.5 w-3.5" />
                Free Service · RERA Registered
              </div>
              <h1 className="text-4xl md:text-[60px] font-black text-white leading-[1.0] tracking-tight mb-4">
                Your Home Loan,<br />
                <span className="text-primary">Handled For You.</span>
              </h1>
              <p className="text-base text-white/60 max-w-lg leading-relaxed">
                500+ families in Ambernath, Badlapur &amp; MMR guided through the home loan process — from CIBIL check to disbursement. We charge you nothing.
              </p>
            </div>
            <div className="shrink-0">
              <a href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-12 px-7 text-sm font-bold gap-2 shadow-lg shadow-primary/30">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Get Free Guidance
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="py-10 border-b border-border bg-card">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 gap-0.5 text-center bg-card">
                <p className="text-3xl md:text-4xl font-black text-foreground">{s.value}</p>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Help ──────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <InView
            once
            viewOptions={{ margin: "0px 0px -40px 0px" }}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Step by Step</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
                Here is What We<br />
                <span className="text-muted-foreground font-light italic">Actually Do.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed md:text-right">
                From your first call to the day the money hits your account.
              </p>
            </div>
          </InView>

          <InView once viewOptions={{ margin: "0px 0px -50px 0px" }}>
            <AnimatedGroup preset="slide" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.title} className="group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all">
                  <span className="text-5xl font-black text-primary/15 leading-none select-none group-hover:text-primary/25 transition-colors">{s.num}</span>
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground text-base mb-1.5">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </AnimatedGroup>
          </InView>
        </div>
      </section>

      {/* ── Banks ────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <InView
            once
            viewOptions={{ margin: "0px 0px -40px 0px" }}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Our Lender Network</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
                Banks We<br />
                <span className="text-muted-foreground font-light italic">Work With.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed md:text-right">
                Established relationships with all major lenders — so we know who moves fast and who gives the best terms.
              </p>
            </div>
          </InView>

          <InView once viewOptions={{ margin: "0px 0px -50px 0px" }}>
            <AnimatedGroup preset="scale" className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {banks.map((b) => (
                <div key={b.name} className="flex flex-col items-center gap-3 bg-card border border-border rounded-2xl py-6 px-3 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="h-14 w-full rounded-xl bg-white border border-border flex items-center justify-center shadow-sm overflow-hidden px-3 py-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.logo} alt={b.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center font-medium leading-tight">{b.name}</p>
                </div>
              ))}
            </AnimatedGroup>
          </InView>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="relative overflow-hidden bg-foreground rounded-3xl px-8 md:px-16 py-16 md:py-20">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-5xl font-black text-background leading-tight mb-4">
                  Already Found<br />a Home?
                </h2>
                <p className="text-background/50 text-sm leading-relaxed">
                  One call or message is all it takes. We will understand your situation, compare your options, and guide you — step by step, no pressure, no charge.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 text-base px-8 font-bold bg-white text-foreground hover:bg-white/90">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
