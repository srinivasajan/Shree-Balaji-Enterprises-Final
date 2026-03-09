"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Search, Map, List } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { SearchFilters } from "@/components/search-filters"
import { MapView } from "@/components/map-view"
import { useBuyProperties } from "@/hooks/use-properties"

function BuyPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")
  const [showMap, setShowMap] = useState(true)
  const buyProperties = useBuyProperties()

  const filtered = searchQuery.trim()
    ? buyProperties.filter((p) => {
        const haystack = [p.address, p.city, p.state, p.description ?? "", ...(p.features ?? [])].join(" ").toLowerCase()
        return searchQuery.toLowerCase().split(" ").every((word) => haystack.includes(word))
      })
    : buyProperties

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[420px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Properties for sale across Mumbai Metropolitan Region"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 pt-20 pb-10 w-full">
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Buy · RERA A51700023633 · 500+ Listings
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.05] tracking-tight mb-3">
            Properties for Sale<br />
            <span className="text-primary">in MMR.</span>
          </h1>
          <p className="text-sm text-white/60 max-w-lg mb-6">
            Browse residential, commercial and industrial properties across Ambernath, Badlapur, Kalyan and 13+ cities.
          </p>
          {/* Search bar */}
          <div className="flex items-center gap-3 max-w-2xl">
            <div className="flex-1 flex items-center bg-card rounded-lg px-3 shadow-lg">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, area or property type..."
                className="w-full px-3 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button className="hidden md:flex items-center gap-1.5 px-6 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shrink-0 shadow-lg shadow-primary/30">
              Search
            </button>
            <div className="hidden md:flex items-center gap-0 border border-border bg-card rounded-lg overflow-hidden shrink-0 shadow-lg">
              <button
                onClick={() => setShowMap(true)}
                className={`p-2.5 transition-colors ${showMap ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                aria-label="Map view"
              >
                <Map className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowMap(false)}
                className={`p-2.5 transition-colors ${!showMap ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <SearchFilters />

      {/* Results count */}
      <div className="bg-card px-4 py-2 border-b border-border">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between">
          <p className="text-sm text-foreground">
            <span className="font-bold">{filtered.length}</span> {filtered.length === 1 ? "result" : "results"}
            {searchQuery.trim() && <span className="text-muted-foreground"> for &ldquo;{searchQuery}&rdquo;</span>}
          </p>
          <button
            className="md:hidden flex items-center gap-1 text-sm text-foreground"
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? <List className="h-4 w-4" /> : <Map className="h-4 w-4" />}
            {showMap ? "List" : "Map"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Property list */}
        <div className={`${showMap ? "w-full lg:w-1/2 xl:w-[55%]" : "w-full"} overflow-y-auto bg-background`}>
          <div className={`p-4 grid gap-4 ${showMap ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1280px] mx-auto"}`}>
            {filtered.length > 0 ? (
              filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-base font-semibold text-foreground mb-2">No properties found</p>
                <p className="text-sm text-muted-foreground mb-4">Try a different search term or <button onClick={() => setSearchQuery("")} className="text-primary hover:underline">clear your search</button></p>
              </div>
            )}
          </div>
        </div>

        {showMap && (
          <div className="hidden lg:block flex-1 sticky top-[60px] h-[calc(100vh-60px)]">
            <MapView properties={filtered} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function BuyPage() {
  return (
    <Suspense>
      <BuyPageContent />
    </Suspense>
  )
}
