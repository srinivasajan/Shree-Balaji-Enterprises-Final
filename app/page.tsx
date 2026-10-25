import { Metadata } from "next"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { ExploreTypes } from "@/components/explore-types"
import { FeaturedListings } from "@/components/featured-listings"
import { ValueProposition } from "@/components/value-proposition"
import { Testimonials } from "@/components/testimonials"
import { PopularSearches } from "@/components/popular-searches"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { InView } from "@/components/core/in-view"

export const metadata: Metadata = {
  title: "Shree Balaji Enterprises — Real Estate in Ambernath & MMR",
  description: "RERA-registered real estate agency in Ambernath (A51700023633). View our latest properties for sale and rent across Badlapur, Thane, and Mumbai.",
  openGraph: {
    title: "Shree Balaji Enterprises — Top Real Estate Agents in Ambernath",
    description: "Browse verified residential and commercial properties in Ambernath, Badlapur, and MMR.",
    url: "https://www.shreebalajienterprises.live",
    images: [{ url: "/images/hero-bg.jpg" }]
  }
}

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Shree Balaji Enterprises",
    "image": "https://www.shreebalajienterprises.live/images/placeholder-logo.png",
    "@id": "https://www.shreebalajienterprises.live",
    "url": "https://www.shreebalajienterprises.live",
    "telephone": "+917767805544",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ambernath",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.1970,
      "longitude": 73.1910
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100091469033284"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main>
        <HeroSection />
        <ExploreTypes />
        <FeaturedListings />
        <ValueProposition />
        <Testimonials />
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-[1440px] px-4">
            <InView
              once
              viewOptions={{ margin: "0px 0px -60px 0px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-10 shadow-sm"
            >
              <div className="absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                    <Sparkles className="h-3.5 w-3.5" />
                    Published Paper
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-3">
                    Read the research paper on the MMR corridor
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    Explore the published paper covering local market dynamics, the firm's
                    operating model, and the Next.js architecture powering the site.
                  </p>
                </div>
                <div className="flex md:justify-end">
                  <Link
                    href="/research-paper"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-bold text-background transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    Open Paper <BookOpen className="h-4 w-4" />
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </InView>
          </div>
        </section>
        <PopularSearches />

        {/* ── CTA Strip ─────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-4">
            <InView
              once
              viewOptions={{ margin: "0px 0px -60px 0px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden bg-foreground rounded-3xl px-8 md:px-16 py-16 md:py-20"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-lg">
                  <h2 className="text-3xl md:text-5xl font-black text-background leading-tight mb-4">
                    Ready to find<br />your next home?
                  </h2>
                  <p className="text-background/50 text-sm leading-relaxed">
                    Over 500 properties sold. 1000+ happy families. Talk to our team today &mdash; free, no pressure.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/buy"
                    className="inline-flex h-12 items-center justify-center px-8 text-sm font-bold bg-primary text-primary-foreground rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    Browse Properties
                  </Link>
                  <a
                    href="https://wa.me/917767805544?text=Hi%2C%20I%20want%20to%20buy%20or%20sell%20a%20property.%20Please%20help."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center px-8 text-sm font-bold bg-white/10 border border-white/20 text-background rounded-lg hover:bg-white/20 active:scale-[0.98] transition-all gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </InView>
          </div>
        </section>
      </main>
    </>
  )
}
