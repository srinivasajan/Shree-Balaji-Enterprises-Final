"use client"

import Image from "next/image"
import {
  Shield, CheckCircle2,
  Phone, MessageCircle,
  FileText, Handshake, UserCheck, Building2,
  BadgeIndianRupee, ClipboardList, Users, Heart,
  ArrowRight, Sparkles, Star
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const steps = [
  {
    num: "01",
    icon: UserCheck,
    title: "Eligibility Check",
    description: "We review your income, CIBIL score and profile — and tell you honestly what you qualify for before you approach any bank.",
    color: "bg-blue-600",
    text: "text-blue-600",
  },
  {
    num: "02",
    icon: Building2,
    title: "Bank Comparison",
    description: "We approach 4–6 banks simultaneously and bring you the best rate and terms — not just the first offer.",
    color: "bg-violet-600",
    text: "text-violet-600",
  },
  {
    num: "03",
    icon: FileText,
    title: "Document Handling",
    description: "We guide you on every document, review your file before submission, and make sure there are zero surprises.",
    color: "bg-emerald-600",
    text: "text-emerald-600",
  },
  {
    num: "04",
    icon: Handshake,
    title: "End-to-End Follow-up",
    description: "We stay with you from application day to disbursement day — following up with the bank so you never have to wonder.",
    color: "bg-orange-500",
    text: "text-orange-500",
  },
]

const stats = [
  { value: "500+", label: "Families Helped", icon: Users },
  { value: "6+", label: "Partner Banks", icon: Building2 },
  { value: "Rs.0", label: "Cost to You", icon: BadgeIndianRupee },
  { value: "RERA", label: "A51700023633", icon: Shield },
]

const banks = [
  { name: "State Bank of India", logo: "/images/banks/sbi.svg" },
  { name: "HDFC Bank", logo: "/images/banks/hdfc.svg" },
  { name: "ICICI Bank", logo: "/images/banks/icici.svg" },
  { name: "Axis Bank", logo: "/images/banks/axis.svg" },
  { name: "LIC Housing Finance", logo: "/images/banks/lic-hfl.svg" },
  { name: "PNB Housing Finance", logo: "/images/banks/pnb-hfl.webp" },
]

const reasons = [
  { icon: Star, title: "Multiple bank options", desc: "We compare 4–6 banks so you get choices — not just whatever one bank decides to offer.", accent: "bg-yellow-400" },
  { icon: BadgeIndianRupee, title: "Completely free", desc: "Zero charges to you. We earn a small referral fee from the bank on your behalf.", accent: "bg-green-400" },
  { icon: Shield, title: "RERA Registered", desc: "We are a verified, regulated agency — not a random middleman. Reg: A51700023633.", accent: "bg-blue-400" },
  { icon: ClipboardList, title: "One-stop service", desc: "Property search, loan, paperwork, and registration — all handled together by us.", accent: "bg-purple-400" },
]

export default function HomeLoansPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-end">
        <div className="absolute inset-0">
          <Image src="/images/mortgage-hero.jpg" alt="Home loan assistance" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 w-full mx-auto max-w-[1280px] px-4 pb-20 pt-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 bg-primary text-primary-foreground text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="h-3.5 w-3.5" />
              Free Service · RERA Registered · Est. Ambernath
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              Because Every<br />
              <span className="text-primary">Home Loan</span><br />
              Is Personal.
            </h1>
            <p className="text-base md:text-lg text-white/75 mb-10 max-w-lg leading-relaxed">
              We have guided 500+ families in Ambernath, Badlapur and across MMR through the home loan process — handling everything from CIBIL checks to disbursement. And we charge you <strong className="text-white">nothing.</strong>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-12 px-7 text-sm font-bold shadow-2xl gap-2">
                  <MessageCircle className="h-4 w-4" /> Let us Talk on WhatsApp
                </Button>
              </a>
              <a href="tel:7767805544">
                <Button size="lg" className="h-12 px-7 text-sm font-bold gap-2 bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm">
                  <Phone className="h-4 w-4" /> Call 7767805544
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/20">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-7 px-4 gap-1 text-center">
                <s.icon className="h-5 w-5 text-primary-foreground/60 mb-1" />
                <p className="text-2xl md:text-3xl font-extrabold text-primary-foreground">{s.value}</p>
                <p className="text-[11px] text-primary-foreground/70 font-medium uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONAL QUOTE */}
      <section className="py-14 bg-muted/40 border-b border-border">
        <div className="mx-auto max-w-[820px] px-4 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-5">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <blockquote className="text-lg md:text-xl text-foreground/80 italic leading-relaxed mb-4">
            "We know this is one of the biggest financial decisions of your life. So we do not just process your loan — we sit with you, explain every step, and make sure you feel confident throughout. That is how we have always worked."
          </blockquote>
          <p className="text-sm font-semibold text-muted-foreground">— Shree Balaji Enterprises Team, Ambernath</p>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold text-primary uppercase tracking-[0.2em] mb-2">Step by Step</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Here is What We<br />Actually Do
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              From your first call to the day the money hits your account — we handle it all.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="group relative bg-card border border-border rounded-3xl p-7 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <span className="absolute top-4 right-5 text-7xl font-black text-foreground/5 leading-none select-none">{s.num}</span>
                <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${s.color} mb-5 shadow-lg`}>
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <p className={`text-[10px] font-extrabold uppercase tracking-widest ${s.text} mb-1.5`}>Step {s.num}</p>
                <h3 className="text-lg font-extrabold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-12 -right-3 h-5 w-5 text-border z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — dark */}
      <section className="py-20 md:py-28 bg-foreground">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold text-primary uppercase tracking-[0.2em] mb-2">Why Families Trust Us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              We are Not a Portal.<br />
              <span className="text-primary">We are Your People.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r) => (
              <div key={r.title} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-colors">
                <div className={`inline-flex items-center justify-center h-11 w-11 rounded-xl ${r.accent} mb-5`}>
                  <r.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">{r.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANKS */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-extrabold text-primary uppercase tracking-[0.2em] mb-2">Our Lender Network</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">Banks We Work With</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              Established relationships with all major lenders — so we know who moves fast and who gives the best terms.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {banks.map((b) => (
              <div key={b.name} className="flex flex-col items-center gap-3 bg-card border border-border rounded-2xl py-6 px-3 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="h-14 w-full rounded-xl bg-white border border-border flex items-center justify-center shadow-sm overflow-hidden px-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.logo} alt={b.name} className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-[10px] text-muted-foreground text-center font-medium leading-tight">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="mx-auto max-w-[1280px] px-4 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-foreground/10 mb-6">
            <Heart className="h-6 w-6 text-primary-foreground/80" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
            Already Found a Home?<br />Let Us Handle the Loan.
          </h2>
          <p className="text-base text-primary-foreground/70 mb-10 max-w-lg mx-auto leading-relaxed">
            One call or message is all it takes. We will understand your situation, compare your options, and guide you — step by step, no pressure, no charge.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 text-sm font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 shadow-xl">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:7767805544">
              <Button size="lg" className="h-12 px-8 text-sm font-bold bg-transparent border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                <Phone className="h-4 w-4" /> Call 7767805544
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {["We compare 4–6 banks for you", "Zero cost — ever", "CIBIL score guidance included", "We follow up till disbursement"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <CheckCircle2 className="h-4 w-4 text-primary-foreground/50 shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <p className="text-xs text-primary-foreground/40 mt-8">Mon–Sat · 9 AM – 8 PM · We pick up.</p>
        </div>
      </section>

      <Footer />
    </>
  )
}
