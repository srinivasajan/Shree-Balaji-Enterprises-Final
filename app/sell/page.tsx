"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { InView } from "@/components/core/in-view"
import { AnimatedGroup } from "@/components/core/animated-group"

const steps = [
  { n: "01", title: "Free Valuation", body: "We visit, assess and give you an honest market price — no inflation, no obligation." },
  { n: "02", title: "Buyer Matching", body: "We match your property to pre-qualified buyers from our private network." },
  { n: "03", title: "Negotiation", body: "Our agent handles every offer and counter-offer on your behalf." },
  { n: "04", title: "Close & Register", body: "We manage all paperwork, stamp duty and registration end-to-end." },
]

const WHATSAPP = "917767805544"

export default function SellPage() {
  const wa = () => {
    const msg = encodeURIComponent("Hi, I'd like to sell my property. Please get in touch for a free valuation.")
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank")
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[520px] xl:min-h-[620px] 2xl:min-h-[700px] flex items-end">
        <div className="absolute inset-0">
          <Image src="/images/sell-hero.jpg" alt="Sell your property" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-16 w-full">
          <InView
            once
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Free Property Valuation
              </div>
              <h1 className="text-4xl md:text-[60px] font-black text-white leading-[1.0] tracking-tight mb-4">
                Your Next Chapter<br />
                <span className="text-primary">Starts Here.</span>
              </h1>
              <p className="text-base text-white/60 max-w-lg leading-relaxed">
                We&apos;ve helped 500+ families across Ambernath &amp; MMR sell their homes — at the right price, with zero stress.
              </p>
            </div>
            <div className="shrink-0">
              <Button size="lg" onClick={wa} className="h-12 px-7 text-sm font-bold gap-2 shadow-lg shadow-primary/30">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Get Free Valuation
              </Button>
            </div>
          </InView>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="py-10 border-b border-border bg-card">
        <div className="mx-auto max-w-[1440px] px-4">
          <InView once viewOptions={{ margin: "0px 0px -40px 0px" }}>
            <AnimatedGroup preset="scale" className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
              {[
                { value: "500+", label: "Properties Sold", sub: "Across MMR" },
                { value: "15+", label: "Years Experience", sub: "Est. 2008" },
                { value: "1000+", label: "Happy Clients", sub: "Residential & Commercial" },
                { value: "5.0 ★", label: "Average Rating", sub: "Google Reviews" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 gap-0.5 text-center bg-card">
                  <p className="text-3xl md:text-4xl font-black text-foreground">{s.value}</p>
                  <p className="text-sm font-semibold text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </AnimatedGroup>
          </InView>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <InView
            once
            viewOptions={{ margin: "0px 0px -40px 0px" }}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">The Process</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
                Four steps to<br />
                <span className="text-muted-foreground font-light italic">your best sale.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed md:text-right">
                We handle everything — from first call to keys handover.
              </p>
            </div>
          </InView>

          <InView once viewOptions={{ margin: "0px 0px -50px 0px" }}>
            <AnimatedGroup preset="slide" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.n} className="group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all">
                  <span className="text-5xl font-black text-primary/15 leading-none select-none group-hover:text-primary/25 transition-colors">{s.n}</span>
                  <div>
                    <h3 className="font-black text-foreground text-base mb-1.5">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
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
                  Ready when<br />you are.
                </h2>
                <p className="text-background/50 text-sm leading-relaxed">
                  No fees. No pressure. Just a free, honest conversation about your property and what it could get on the market today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button size="lg" onClick={wa} className="gap-2 text-base px-8 font-bold bg-white text-foreground hover:bg-white/90">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Us
                </Button>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-8 font-bold bg-transparent border-white/50 text-white hover:bg-white/15 hover:border-white w-full">
                    Contact Page <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
