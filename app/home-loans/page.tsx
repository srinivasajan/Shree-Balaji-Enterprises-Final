import Image from "next/image"
import {
  Shield, CheckCircle2,
  ArrowRight, Info, Phone, MessageCircle,
  FileText, Handshake, Star, UserCheck, Building2,
  BadgeIndianRupee, ClipboardList
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

// Indicative market rates — broker uses these as a reference for clients
const rateData = [
  { bank: "State Bank of India", tenure: "Up to 30 yrs", rate: "8.50%", note: "Best for salaried govt employees", popular: true },
  { bank: "HDFC Bank", tenure: "Up to 20 yrs", rate: "8.75%", note: "Fast processing, good for self-employed", popular: false },
  { bank: "ICICI Bank", tenure: "Up to 20 yrs", rate: "8.90%", note: "Flexible eligibility norms", popular: false },
  { bank: "Axis Bank", tenure: "Up to 20 yrs", rate: "8.85%", note: "Good for higher loan amounts", popular: false },
  { bank: "LIC Housing Finance", tenure: "Up to 25 yrs", rate: "8.65%", note: "Suitable for lower income brackets", popular: false },
  { bank: "PNB Housing Finance", tenure: "Up to 25 yrs", rate: "8.70%", note: "Relaxed documentation for some profiles", popular: false },
]

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

// Documents clients typically need
const docList = [
  { category: "Identity & Address", docs: ["Aadhaar Card", "PAN Card", "Passport / Voter ID (alternate ID)"] },
  { category: "Income Proof — Salaried", docs: ["Last 3 months salary slips", "Form 16 / ITR (2 years)", "6 months bank statement"] },
  { category: "Income Proof — Self Employed", docs: ["ITR for last 2–3 years", "Business proof (GST / Udyam)", "Last 12 months bank statement"] },
  { category: "Property Documents", docs: ["Sale Agreement / Allotment Letter", "Builder NOC / Title Deed", "Approved Building Plan"] },
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
              We'll Help You Get<br />Your Home Loan Done
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

      {/* ── Indicative Bank Rates ── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Indicative Bank Rates</h2>
              <p className="text-sm text-muted-foreground mt-1">
                As of March 2026 — we use this to match you with the right bank for your profile
              </p>
            </div>
            <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              Rates vary by CIBIL score & income
            </div>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-border">
              <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">Bank</div>
              <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground text-center">Rate p.a.</div>
              <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">Best For</div>
            </div>
            {rateData.map((r) => (
              <div key={r.bank} className="grid grid-cols-3 gap-px bg-border">
                <div className="bg-card px-4 py-4 flex items-center gap-2">
                  <div>
                    <p className={`text-sm text-foreground ${r.popular ? "font-bold" : ""}`}>{r.bank}</p>
                    <p className="text-[11px] text-muted-foreground">{r.tenure}</p>
                  </div>
                  {r.popular && (
                    <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded shrink-0">Popular</span>
                  )}
                </div>
                <div className="bg-card px-4 py-4 text-center">
                  <span className="text-base font-bold text-primary">{r.rate}</span>
                </div>
                <div className="bg-card px-4 py-4">
                  <span className="text-xs text-muted-foreground">{r.note}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            We approach the bank that best fits your income, CIBIL score and loan amount — to maximise your chances of approval at the lowest rate.
          </p>
        </div>
      </section>

      {/* ── Documents Checklist ── */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Documents You'll Need</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              We guide you on every document step-by-step. Here's what banks typically ask for — don't worry, we'll review your file before submission.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {docList.map((cat) => (
              <div key={cat.category} className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{cat.category}</h3>
                <ul className="flex flex-col gap-2">
                  {cat.docs.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-5">
            Not sure if your documents are complete? WhatsApp us your property details and we'll give you a personalised checklist.
          </p>
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
