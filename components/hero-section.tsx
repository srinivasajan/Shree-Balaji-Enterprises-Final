"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    router.push(`/buy${query ? `?q=${encodeURIComponent(query)}` : ""}`)
  }

  return (
    <section className="relative bg-neutral-800">
      <div className="relative h-[480px] md:h-[520px] lg:h-[580px] overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Ambernath residential neighbourhood — find your perfect property"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">

          {/* Headline */}
          <div className="text-center mb-7 animate-fade-up">
            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white text-center leading-tight text-balance max-w-3xl">
              Find Your Perfect<br className="hidden md:block" /> Property With Us
            </h1>
          </div>

          {/* Search box */}
          <div className="w-full max-w-2xl animate-fade-up [animation-delay:100ms] px-1">
            <div className="flex bg-card overflow-hidden shadow-xl rounded-lg">
              <div className="flex-1 flex items-center px-4">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search city, area or property type..."
                  className="w-full px-3 py-4 text-sm md:text-base text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search for properties"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 md:px-8 py-4 text-sm font-bold transition-colors shrink-0"
                aria-label="Search"
              >
                <Search className="h-5 w-5 md:hidden" />
                <span className="hidden md:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] w-full pb-1 animate-fade-up [animation-delay:200ms]">
            {[
              "✓ RERA A51700023633",
              "15+ Years Experience",
              "500+ Properties Sold",
              "1000+ Happy Clients",
            ].map((badge) => (
              <span
                key={badge}
                className="shrink-0 text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 whitespace-nowrap"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Secondary CTA */}
          <Link
            href="/buy"
            className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors group animate-fade-up [animation-delay:300ms]"
          >
            Browse all listings
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

        </div>
      </div>
    </section>
  )
}
