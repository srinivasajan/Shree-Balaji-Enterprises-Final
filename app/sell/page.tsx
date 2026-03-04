"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search, TrendingUp, Users, DollarSign, Home, BarChart3,
  CheckCircle2, ArrowRight, Star, Clock, Shield, Target
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Target,
    title: "Get Free Valuation",
    description: "Share your property details and get a free market valuation from our experienced team.",
  },
  {
    icon: Users,
    title: "Connect with Our Agent",
    description: "Get in touch with Anju Jangiti, our expert agent who specializes in properties across the MMR.",
  },
  {
    icon: BarChart3,
    title: "Price It Right",
    description: "We create a competitive pricing strategy based on current market trends and comparable sales.",
  },
  {
    icon: DollarSign,
    title: "Close the Deal",
    description: "From listing to closing, our team guides you through every step of the transaction.",
  },
]

const sellerResources = [
  { title: "Seller's Guide", description: "Step-by-step guide to selling your home for the best price.", href: "#guide" },
  { title: "Home Staging Tips", description: "Make your home shine with these proven staging techniques.", href: "#staging" },
  { title: "Understanding Offers", description: "Learn how to evaluate and negotiate offers like a pro.", href: "#offers" },
  { title: "Closing Costs", description: "What sellers need to know about fees and closing costs.", href: "#costs" },
]

export default function SellPage() {
  const [address, setAddress] = useState("")
  const [showEstimate, setShowEstimate] = useState(false)

  const handleEstimate = () => {
    if (address.trim()) {
      setShowEstimate(true)
    }
  }

  return (
    <>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/sell-hero.jpg" alt="Couple with sold sign" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-card leading-tight mb-4 text-balance">
              Sell Your Home with Confidence
            </h1>
            <p className="text-base md:text-lg text-card/80 mb-8 max-w-lg">
              Get a free property valuation and connect with our expert agent to maximize your sale price.
            </p>

              {/* Valuation search */}
              <div className="bg-card rounded-xl p-6 shadow-xl max-w-lg">
                <h2 className="text-lg font-bold text-foreground mb-1">What is your property worth?</h2>
                <p className="text-sm text-muted-foreground mb-4">Enter your property details for a free valuation</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center border border-border rounded-lg px-3">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEstimate()}
                    placeholder="Enter your home address"
                    className="w-full px-3 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <Button onClick={handleEstimate} className="px-6">
                  Get Estimate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation result */}
      {showEstimate && (
        <section className="py-10 bg-primary/5 border-b border-border">
          <div className="mx-auto max-w-[1280px] px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm text-muted-foreground mb-2">Valuation for</p>
              <h2 className="text-lg font-bold text-foreground mb-4">{address}</h2>
              <div className="inline-flex items-baseline gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-bold text-primary">₹50,00,000</span>
              </div>
              <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  +3.2% (30-day change)
                </span>
                <span className="text-muted-foreground">Range: ₹45L – ₹55L</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Connect with Agent
                </Button>
                <Button variant="outline">View Market Trends</Button>
              </div>
            </div>

            {/* Market comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Median List Price</p>
                <p className="text-xl font-bold text-foreground">₹48,00,000</p>
                <p className="text-xs text-muted-foreground mt-1">Your area</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Avg. Days on Market</p>
                <p className="text-xl font-bold text-foreground">18 days</p>
                <p className="text-xs text-muted-foreground mt-1">Your area</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Sale-to-List Ratio</p>
                <p className="text-xl font-bold text-foreground">98.5%</p>
                <p className="text-xs text-muted-foreground mt-1">Your area</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3 text-balance">
            How Selling Works
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-md mx-auto">
            Four simple steps to sell your home for the best price
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Step {idx + 1}
                </span>
                <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-5 w-5 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary py-10">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">500+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Properties Sold</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">13+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Cities Covered</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">1000+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">5.0</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seller resources */}
      <section className="py-14 md:py-20" id="guide">
        <div className="mx-auto max-w-[1280px] px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Seller Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sellerResources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="flex items-start gap-4 p-5 border border-border rounded-lg bg-card hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{resource.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{resource.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-muted/50">
        <div className="mx-auto max-w-[1280px] px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Ready to Sell?</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Get started with a free property valuation and connect with our agent today.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Get Free Valuation
            </Button>
            <Link href="/agents">
              <Button size="lg" variant="outline">Find an Agent</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
