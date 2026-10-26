"use client"

import { Star, Quote } from "lucide-react"
import { InView } from "@/components/core/in-view"
import { AnimatedGroup } from "@/components/core/animated-group"

const testimonials = [
  {
    name: "Residential Advisory",
    location: "Ambernath",
    rating: 5,
    text: "Guiding home buyers to find verified apartments and villas with clear titles, full legal documentation, and zero friction across Ambernath and surrounding pockets.",
    type: "Verified Advisory",
    initial: "R",
  },
  {
    name: "Land & Plot Due Diligence",
    location: "Badlapur",
    rating: 5,
    text: "Conducting meticulous boundary, ownership, and local authority verification for residential and commercial plots across the fast-growing Badlapur micro-market.",
    type: "Due Diligence",
    initial: "L",
  },
  {
    name: "Commercial & Industrial Deals",
    location: "Ulhasnagar & MMR",
    rating: 5,
    text: "Assisting business owners and investors with lease negotiation, shop acquisitions, and industrial shed transactions with transparent compliance under MahaRERA standards.",
    type: "Commercial Advisory",
    initial: "C",
  },
]

export function Testimonials() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4">
        <InView
          once
          viewOptions={{ margin: "0px 0px -40px 0px" }}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Client Commitments</p>
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
            Our Advisory Standards
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Dedicated real estate guidance and verified property advisory across the Mumbai Metropolitan Region
          </p>
        </InView>

        <InView once viewOptions={{ margin: "0px 0px -50px 0px" }}>
          <AnimatedGroup
            preset="slide"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="h-6 w-6 text-primary/20 absolute -top-1 -left-1" aria-hidden="true" />
                  <p className="text-sm text-foreground leading-relaxed pl-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Person */}
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.type} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedGroup>
        </InView>
      </div>
    </section>
  )
}
