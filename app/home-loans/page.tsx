"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calculator, Shield, Clock, CheckCircle2,
  DollarSign, Percent, Calendar, ArrowRight, Info
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const rateData = [
  { type: "SBI Home Loan (30Y)", rate: "8.50%", apr: "8.65%", change: "-0.05", popular: true },
  { type: "HDFC Home Loan (20Y)", rate: "8.75%", apr: "8.90%", change: "-0.10", popular: false },
  { type: "ICICI Home Loan (15Y)", rate: "8.90%", apr: "9.05%", change: "+0.05", popular: false },
  { type: "Axis Bank (20Y)", rate: "8.85%", apr: "9.00%", change: "-0.05", popular: false },
  { type: "LIC Home Finance", rate: "8.65%", apr: "8.80%", change: "-0.08", popular: false },
  { type: "PNB Housing Finance", rate: "8.70%", apr: "8.85%", change: "-0.03", popular: false },
]

const loanSteps = [
  { icon: Calculator, title: "Check Rates", description: "Compare today's home loan rates from SBI, HDFC, ICICI and other leading banks." },
  { icon: Shield, title: "Get Pre-Approved", description: "Submit your loan application and get in-principle approval from your preferred bank." },
  { icon: DollarSign, title: "Choose Your Loan", description: "Compare offers and select the home loan that best fits your budget and tenure." },
  { icon: CheckCircle2, title: "Close with Confidence", description: "Our team coordinates with the bank to ensure smooth disbursement and registration." },
]

export default function HomeLoansPage() {
  const [homePrice, setHomePrice] = useState(5000000)
  const [downPayment, setDownPayment] = useState(1000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanTerm, setLoanTerm] = useState(30)

  const monthlyPayment = useMemo(() => {
    const principal = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    if (monthlyRate === 0) return Math.round(principal / numPayments)
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    return Math.round(payment)
  }, [homePrice, downPayment, interestRate, loanTerm])

  const propertyTax = Math.round(homePrice * 0.001 / 12)
  const insurance = 0
  const totalMonthly = monthlyPayment + propertyTax + insurance

  return (
    <>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/mortgage-hero.jpg" alt="Couple reviewing mortgage" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-card leading-tight mb-4 text-balance">
              Home Loans Made Simple
            </h1>
            <p className="text-base md:text-lg text-card/80 mb-8 max-w-lg">
              Compare home loan rates from India's top banks, calculate your EMI, and get expert guidance — all in one place.
            </p>
            <div className="flex items-center gap-3">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                Get Pre-Approved
              </Button>
              <a href="#calculator">
                <Button size="lg" variant="outline" className="border-card text-card hover:bg-card/10">
                  EMI Calculator
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Today's rates */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{"Today's Home Loan Rates"}</h2>
              <p className="text-sm text-muted-foreground mt-1">Updated February 26, 2026</p>
            </div>
            <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              Rates are estimates only
            </div>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 md:grid-cols-5 gap-px bg-border">
              <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground col-span-1 md:col-span-2">Loan Type</div>
              <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground text-center">Rate</div>
              <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground text-center hidden md:block">APR</div>
              <div className="bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground text-center">Change</div>
            </div>
            {rateData.map((rate) => (
              <div key={rate.type} className="grid grid-cols-4 md:grid-cols-5 gap-px bg-border">
                <div className={`bg-card px-4 py-4 col-span-1 md:col-span-2 flex items-center gap-2 ${rate.popular ? "font-bold" : ""}`}>
                  <span className="text-sm text-foreground">{rate.type}</span>
                  {rate.popular && <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Popular</span>}
                </div>
                <div className="bg-card px-4 py-4 text-center">
                  <span className="text-sm font-bold text-foreground">{rate.rate}</span>
                </div>
                <div className="bg-card px-4 py-4 text-center hidden md:block">
                  <span className="text-sm text-muted-foreground">{rate.apr}</span>
                </div>
                <div className="bg-card px-4 py-4 text-center">
                  <span className={`text-sm font-semibold ${rate.change.startsWith("-") ? "text-green-600" : "text-destructive"}`}>
                    {rate.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortgage Calculator */}
      <section className="py-12 md:py-16 bg-muted/50" id="calculator">
        <div className="mx-auto max-w-[1280px] px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">Home Loan EMI Calculator</h2>
          <p className="text-sm text-muted-foreground text-center mb-10">Estimate your monthly payment</p>

          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Inputs */}
            <div className="flex-1 bg-card border border-border rounded-xl p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">Property Price (₹)</label>
                <div className="flex items-center border border-border rounded-lg px-3">
                  <span className="text-muted-foreground text-sm">₹</span>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full py-3 px-2 text-sm bg-transparent text-foreground focus:outline-none"
                  />
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={100000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full mt-2 accent-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">Down Payment (₹)</label>
                <div className="flex items-center border border-border rounded-lg px-3">
                  <span className="text-muted-foreground text-sm">₹</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full py-3 px-2 text-sm bg-transparent text-foreground focus:outline-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((downPayment / homePrice) * 100).toFixed(0)}% of home price
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">Interest Rate (%)</label>
                <div className="flex items-center border border-border rounded-lg px-3">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full py-3 px-2 text-sm bg-transparent text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Loan Term</label>
                <div className="flex gap-2">
                  {[15, 20, 30].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`flex-1 py-2.5 text-sm font-semibold rounded-md border transition-colors ${
                        loanTerm === term
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {term} years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:w-[340px] shrink-0">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-[84px]">
                <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
                <p className="text-4xl font-bold text-foreground mb-6">₹{totalMonthly.toLocaleString('en-IN')}</p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">{"Principal & Interest"}</span>
                    </div>
                      <span className="text-sm font-semibold text-foreground">₹{monthlyPayment.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-chart-2" />
                      <span className="text-sm text-foreground">Property Tax (est.)</span>
                    </div>
                      <span className="text-sm font-semibold text-foreground">₹{propertyTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-chart-4" />
                      <span className="text-sm text-foreground">Insurance</span>
                    </div>
                      <span className="text-sm font-semibold text-foreground">₹{insurance}</span>
                  </div>
                </div>

                {/* Simple bar chart */}
                <div className="flex h-4 rounded-full overflow-hidden mt-6">
                  <div className="bg-primary" style={{ width: `${(monthlyPayment / totalMonthly) * 100}%` }} />
                  <div className="bg-chart-2" style={{ width: `${(propertyTax / totalMonthly) * 100}%` }} />
                  <div className="bg-chart-4" style={{ width: `${(insurance / totalMonthly) * 100}%` }} />
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                  <p className="text-sm font-bold text-foreground">₹{(homePrice - downPayment).toLocaleString('en-IN')}</p>
                </div>

                <Button className="w-full mt-4">Get Pre-Approved</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16" id="pre-approved">
        <div className="mx-auto max-w-[1280px] px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {loanSteps.map((step, idx) => (
              <div key={step.title} className="relative text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {idx < loanSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-5 w-5 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Partners */}
      <section className="py-12 bg-muted/50" id="banks">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Our Bank Partners</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              We assist you in getting home loans from all major banks and housing finance companies in India.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              { name: "State Bank of India", short: "SBI", color: "bg-blue-50 border-blue-200 text-blue-800" },
              { name: "HDFC Bank", short: "HDFC", color: "bg-red-50 border-red-200 text-red-800" },
              { name: "ICICI Bank", short: "ICICI", color: "bg-orange-50 border-orange-200 text-orange-800" },
              { name: "Axis Bank", short: "AXIS", color: "bg-purple-50 border-purple-200 text-purple-800" },
              { name: "LIC Housing Finance", short: "LIC HFL", color: "bg-green-50 border-green-200 text-green-800" },
              { name: "PNB Housing Finance", short: "PNB HFL", color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
            ].map((bank) => (
              <div key={bank.name} className={`flex flex-col items-center justify-center p-4 rounded-xl border ${bank.color} text-center`}>
                <p className="text-xl font-bold mb-1">{bank.short}</p>
                <p className="text-[10px] font-medium leading-tight">{bank.name}</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">Need Help Getting a Home Loan?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team at Shree Balaji Enterprises will guide you through the entire home loan process — from bank selection to application and disbursement. We work with all major banks and housing finance companies.
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {["Free loan consultation", "Compare multiple bank offers", "Documentation assistance", "Fast-track processing support"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex flex-col gap-3">
              <a href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20getting%20a%20home%20loan.%20Please%20guide%20me." target="_blank" rel="noopener noreferrer">
                <Button className="w-full">WhatsApp for Loan Help</Button>
              </a>
              <a href="tel:7767805544">
                <Button variant="outline" className="w-full">Call 7767805544</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
