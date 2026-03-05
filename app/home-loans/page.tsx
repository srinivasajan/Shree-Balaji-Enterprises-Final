import Image from "next/image"
import {
  Shield, CheckCircle2,
  ArrowRight, Phone, MessageCircle,
  FileText, Handshake, Star, UserCheck, Building2,
  BadgeIndianRupee, ClipboardList
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

// What we do as a broker for the client
const brokerServices = [
  {
    icon: UserCheck,
    title: "Eligibility Check",
    description: "We assess your income, CIBIL score and property value to find which banks will approve your loan and at what amount.",
  },
  {
    icon: Building2,
    title: "Bank Matching",
    description: "We compare multiple banks on your behalf and approach the lender most likely to give you the best rate for your profile.",
  },
  {
    icon: FileText,
    title: "Full Documentation Support",
    description: "We tell you exactly which documents to submit — salary slips, ITR, property papers, KYC — and help you prepare a clean file.",
  },
  {
    icon: Handshake,
    title: "Negotiation & Follow-up",
    description: "We negotiate interest rates with the bank on your behalf and follow up from application to disbursement — so you don't have to.",
  },
]

// Why use a broker instead of going directly to bank
const whyBroker = [
  { icon: Star, title: "We Compare, You Choose", desc: "We approach 4–6 banks at once and bring you the best offer. Going directly means you only get one bank's deal." },
  { icon: BadgeIndianRupee, title: "Completely Free for You", desc: "Our home loan assistance is free of cost. We earn a referral from the bank — you pay nothing extra." },
  { icon: Shield, title: "RERA Registered — Trustworthy", desc: "RERA No: A51700023633. You're dealing with a verified, regulated real estate agency — not an unknown middleman." },
  { icon: ClipboardList, title: "One Window for Everything", desc: "Property search, site visits, negotiation, home loan, registration — we handle all of it. No running around to different people." },
]

export default function HomeLoansPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[460px] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/mortgage-hero.jpg" alt="Home loan assistance by Shree Balaji Enterprises" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 md:py-28 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full mb-5 tracking-wide">
              FREE SERVICE · RERA REGISTERED · A51700023633
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Because Every<br />Home Loan Is Personal
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-3 max-w-xl">
              As your property broker, Shree Balaji Enterprises doesn't just find you the right home — we also connect you with the right bank, handle your paperwork and negotiate the best rate. All at <span className="text-white font-semibold">zero cost to you.</span>
            </p>
            <p className="text-sm text-white/60 mb-8">Serving Ambernath, Badlapur & the Mumbai Metropolitan Region</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold shadow">
                  <MessageCircle className="h-4 w-4 mr-2" /> Talk to Us on WhatsApp
                </Button>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do As Your Broker ── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">What We Do For You</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Getting a home loan on your own means dealing with one bank at a time, endless paperwork and zero negotiating power. We handle all of that for you — for free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {brokerServices.map((s, i) => (
              <div key={s.title} className="relative bg-card border border-border rounded-xl p-5 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mx-auto mb-4">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary block mb-1">STEP {i + 1}</span>
                <h3 className="text-sm font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                {i < brokerServices.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-3 h-5 w-5 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Use a Broker ── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Get Your Loan Through Us?</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Walking into a bank alone puts you at a disadvantage. Working with us levels the playing field.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBroker.map((w) => (
              <div key={w.title} className="bg-card border border-border rounded-xl p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <w.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{w.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banks We Work With + Final CTA ── */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="mx-auto max-w-[1280px] px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">Banks We Work With</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            We have established relationships with all major lenders in Ambernath, Badlapur and the MMR region.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              { name: "State Bank of India", short: "SBI", color: "bg-blue-50 border-blue-200 text-blue-800" },
              { name: "HDFC Bank", short: "HDFC", color: "bg-red-50 border-red-200 text-red-800" },
              { name: "ICICI Bank", short: "ICICI", color: "bg-orange-50 border-orange-200 text-orange-800" },
              { name: "Axis Bank", short: "AXIS", color: "bg-purple-50 border-purple-200 text-purple-800" },
              { name: "LIC Housing Finance", short: "LIC HFL", color: "bg-green-50 border-green-200 text-green-800" },
              { name: "PNB Housing Finance", short: "PNB HFL", color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
            ].map((b) => (
              <div key={b.name} className={`flex flex-col items-center justify-center p-4 rounded-xl border ${b.color} text-center`}>
                <p className="text-xl font-bold mb-1">{b.short}</p>
                <p className="text-[10px] font-medium leading-tight">{b.name}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Free Broker Service</p>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Buying a property? Let us sort your home loan too.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Whether you've already chosen a property or are still looking, reach out to us. We'll check your eligibility, shortlist the best bank, manage your paperwork and follow up until the loan is in your account — at absolutely zero cost to you.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "We compare 4–6 banks at once",
                  "CIBIL score guidance if needed",
                  "Document review before submission",
                  "Rate negotiation on your behalf",
                  "Follow-up until disbursement",
                  "No fee charged to you ever",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex flex-col gap-3 min-w-[210px]">
              <a
                href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me."
                target="_blank" rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Us Now
                </Button>
              </a>
              <a href="tel:7767805544">
                <Button size="lg" variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" /> Call 7767805544
                </Button>
              </a>
              <p className="text-[11px] text-muted-foreground text-center">Mon–Sat, 9 AM – 8 PM</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
