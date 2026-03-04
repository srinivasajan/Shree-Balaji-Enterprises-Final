"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import Image from "next/image"

const searchTabs = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "Home Loans", href: "/home-loans" },
  { label: "Agent Finder", href: "/agents" },
]

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("Buy")
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const tab = searchTabs.find((t) => t.label === activeTab)
    if (tab) {
      router.push(`${tab.href}${query ? `?q=${encodeURIComponent(query)}` : ""}`)
    }
  }

  // Determine if the active tab is the last tab — if so, the search box top-right
  // corner must be square to visually connect with the tab above it.
  const activeTabIndex = searchTabs.findIndex((t) => t.label === activeTab)
  const isLastTabActive = activeTabIndex === searchTabs.length - 1

  return (
    // Fix 6: fallback bg-neutral-800 shown while/if the image fails to load
    <section className="relative bg-neutral-800">
      {/* Fix 7: taller mobile height so content isn't cramped */}
      <div className="relative h-[420px] md:h-[480px] lg:h-[540px] overflow-hidden">
        {/* Fix 2 & 3: local image with accurate alt text */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Ambernath residential neighbourhood — find your perfect property"
          fill
          className="object-cover"
          priority
        />
        {/* Fix 1: reliable black overlay instead of bg-foreground/40 */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          {/* Fix 8: remove manual <br> that conflicted with text-balance */}
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white text-center leading-tight text-balance mb-8 max-w-3xl">
            Find Your Perfect Property With Us
          </h1>

          <div className="w-full max-w-2xl">
            {/* Fix 5: flex-wrap so tabs wrap gracefully on very small screens */}
            <div className="flex flex-wrap gap-0.5 mb-0">
              {searchTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-3 py-2 text-xs md:text-sm font-semibold rounded-t-lg transition-colors ${
                    activeTab === tab.label
                      ? "bg-card text-foreground"
                      : "bg-card/70 text-foreground/80 hover:bg-card/90"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Fix 4: top-right corner is square when last tab is active, rounded otherwise */}
            <div
              className={`flex bg-card overflow-hidden shadow-lg rounded-b-lg ${
                isLastTabActive ? "rounded-tl-none rounded-tr-none" : "rounded-tr-lg"
              }`}
            >
              <div className="flex-1 flex items-center px-4">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search by location, property type, or project name"
                  className="w-full px-3 py-4 text-sm md:text-base text-foreground bg-transparent placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search for properties"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-4 text-sm font-bold transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 md:hidden" />
                <span className="hidden md:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-3 mt-5 flex-wrap justify-center">
            {[
              "✓ RERA A51700023633",
              "15+ Years Experience",
              "500+ Properties Sold",
              "1000+ Happy Clients",
            ].map((badge) => (
              <span
                key={badge}
                className="text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/25"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
