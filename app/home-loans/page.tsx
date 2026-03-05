import Image from "next/image"
import {
  Shield, CheckCircle2,
  ArrowRight, Phone, MessageCircle,
  FileText, Handshake, Star, UserCheck, Building2,
  BadgeIndianRupee, ClipboardList, Clock, Users
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const brokerServices = [
  {
    icon: UserCheck,
    title: "Eligibility Check",
    description: "We assess your income, CIBIL score and property value to find which banks will approve your loan and at what amount.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Building2,
    title: "Bank Matching",
    description: "We compare multiple banks on your behalf and approach the lender most likely to give you the best rate for your profile.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: FileText,
    title: "Documentation Support",
    description: "We tell you exactly which documents to submit — salary slips, ITR, property papers, KYC — and help you prepare a clean file.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Handshake,
    title: "Negotiation & Follow-up",
    description: "We negotiate interest rates with the bank on your behalf and follow up from application to disbursement — so you don't have to.",
    gradient: "from-orange-500 to-orange-600",
  },
]

const whyBroker = [
  { icon: Star, title: "We Compare, You Choose", desc: "We approach 4–6 banks at once and bring you the best offer. Going directly means you only get one bank's deal.", accent: "text-yellow-500" },
  { icon: BadgeIndianRupee, title: "Completely Free for You", desc: "Our home loan assistance is free of cost. We earn a referral from the bank — you pay nothing extra.", accent: "text-green-500" },
  { icon: Shield, title: "RERA Registered", desc: "RERA No: A51700023633. You're dealing with a verified, regulated real estate agency — not an unknown middleman.", accent: "text-blue-500" },
  { icon: ClipboardList, title: "One Window for Everything", desc: "Property search, site visits, negotiation, home loan, registration — we handle all of it. No running around.", accent: "text-purple-500" },
]

const banks = [
  { name: "State Bank of India", short: "SBI", bg: "bg-blue-600" },
  { name: "HDFC Bank", short: "HDFC", bg: "bg-red-600" },
  { name: "ICICI Bank", short: "ICICI", bg: "bg-orange-500" },
  { name: "Axis Bank", short: "AXIS", bg: "bg-violet-600" },
  { name: "LIC Housing Finance", short: "LIC HFL", bg: "bg-emerald-600" },
  { name: "PNB Housing Finance", short: "PNB HFL", bg: "bg-amber-500" },
]

export default function HomeLoansPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/mortgage-hero.jpg" alt="Home loan assistance" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 md:py-28 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-full mb-6 tracking-wide shadow-lg">
              <Shield className="h-3.5 w-3.5" /> FREE SERVICE · RERA REGISTERED · A51700023633
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
              Because Every<br />
              <span className="text-primary">Home Loan Is Personal</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              We don't just find you the right home — we connect you with the right bank, handle your paperwork and negotiate the best rate. All at <span className="text-white font-semibold underline underline-offset-2 decoration-primary">zero cost to you.</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold shadow-xl px-6">
                  <MessageCircle className="h-4 w-4 mr-2" /> Talk to Us on WhatsApp
                </Button>
              </a>
              <a href="tel:7767805544">
                <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 px-6 shadow-none">
                  <Phone className="h-4 w-4 mr-2" /> Call Now
                </Button>
              </a>
            </div>
            {/* Stats strip */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Users, value: "500+", label: "Loans Processed" },
                { icon: Building2, value: "6+", label: "Partner Banks" },
                { icon: Clock, value: "Free", label: "Our Service" },
                { icon: Shield, value: "RERA", label: "Registered" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <s.icon className="h-4 w-4 text-white/70" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white leading-none">{s.value}</p>
                    <p className="text-[11px] text-white/55">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Our Process</p>
            <h2 className="text-3xl font-extrabold text-foreground mb-3">What We Do For You</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Getting a home loan on your own means one bank at a time, endless paperwork and zero negotiating power. We handle all of that — for free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {brokerServices.map((s, i) => (
              <div key={s.title} className="relative group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${s.gradient} mx-auto mb-5 shadow-md`}>
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-[10px] font-bold text-primary/70 uppercase tracking-widest block mb-1">Step {i + 1}</span>
                <h3 className="text-sm font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                {i < brokerServices.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-3 h-5 w-5 text-border z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-extrabold text-foreground mb-3">Why Work With Us?</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Walking into a bank alone puts you at a disadvantage. Working with us levels the playing field.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBroker.map((w) => (
              <div key={w.title} className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 -translate-y-8 translate-x-8" />
                <w.icon className={`h-8 w-8 ${w.accent} mb-4`} />
                <h3 className="text-sm font-bold text-foreground mb-2">{w.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banks ── */}
      <section className="py-16 md:py-20 bg-foreground">
        <div className="mx-auto max-w-[1280px] px-4">
          <p className="text-xs font-bold text-primary uppercase tracking-widest text-center mb-2">Our Partners</p>
          <h2 className="text-3xl font-extrabold text-white text-center mb-3">Banks We Work With</h2>
          <p className="text-sm text-white/50 text-center mb-10 max-w-lg mx-auto">
            We have established relationships with all major lenders across the Mumbai Metropolitan Region.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-14">
            {banks.map((b) => (
              <div key={b.name} className="flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <div className={`h-10 w-10 rounded-xl ${b.bg} flex items-center justify-center px-1`}>
                  <span className="text-[9px] font-extrabold text-white leading-none text-center">{b.short}</span>
                </div>
                <p className="text-[10px] text-white/60 leading-tight font-medium">{b.name}</p>
              </div>
            ))}
          </div>

          {/* CTA inside dark section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-10">
            <div className="flex-1">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">Free Broker Service</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-snug">
                Buying a property?<br />Let us sort your home loan too.
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-lg">
                Whether you've already chosen a property or are still looking, reach out to us. We'll check your eligibility, shortlist the best bank, manage your paperwork and follow up until the loan is in your account — at absolutely zero cost to you.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Compare 4–6 banks at once",
                  "CIBIL score guidance",
                  "Document review before submission",
                  "Rate negotiation on your behalf",
                  "Follow-up until disbursement",
                  "No fee — ever",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex flex-col gap-3 w-full md:w-[220px]">
              <a href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full shadow-lg">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Us Now
                </Button>
              </a>
              <a href="tel:7767805544">
                <Button size="lg" className="w-full bg-transparent border border-white/40 text-white hover:bg-white/10 hover:text-white shadow-none">
                  <Phone className="h-4 w-4 mr-2" /> Call 7767805544
                </Button>
              </a>
              <p className="text-[11px] text-white/30 text-center">Mon–Sat, 9 AM – 8 PM</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
