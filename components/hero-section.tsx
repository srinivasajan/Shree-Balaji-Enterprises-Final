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
    <section className="relative overflow-hidden">
      <div className="relative h-[480px] md:h-[520px] lg:h-[580px] overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Ambernath residential neighbourhood — find your perfect property"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/65 to-foreground/15" />

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 pb-12 md:pb-16">
          <div className="w-full max-w-3xl text-center">

            {/* Text block with backdrop blur */}
            <div className="backdrop-blur-sm bg-foreground/20 rounded-2xl px-6 pt-8 pb-6 mb-5">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                RERA A51700023633 · 15+ Years · Ambernath
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-[56px] font-black text-white leading-[1.0] tracking-tight mb-4">
                Find Your Perfect<br />
                <span className="text-primary">Property With Us.</span>
              </h1>

              <p className="text-base text-white/70 max-w-lg mx-auto leading-relaxed">
                500+ properties sold across Ambernath, Badlapur, Kalyan &amp; 13+ cities in the Mumbai Metropolitan Region.
              </p>
            </div>

            {/* Search box */}
            <div className="w-full max-w-2xl mx-auto">
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

            {/* Quick links */}
            <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
              <Link href="/buy" className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors group">
                Browse listings <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <span className="text-white/20">·</span>
              <Link href="/sell" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">Sell a property</Link>
              <span className="text-white/20">·</span>
              <Link href="/home-loans" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">Home loans</Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
