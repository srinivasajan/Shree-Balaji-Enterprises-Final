"use client"

import { useState } from "react"
import { Search, Map, List, SlidersHorizontal, ChevronDown, Building2, Home, Building, DollarSign, Shield, Zap } from "lucide-react"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { MapView } from "@/components/map-view"
import { rentalProperties } from "@/lib/data"
import { Button } from "@/components/ui/button"

const rentalTypes = [
  { icon: Building2, label: "Apartments", count: "850K+" },
  { icon: Home, label: "Houses", count: "320K+" },
  { icon: Building, label: "Condos", count: "210K+" },
]

export default function RentPage() {
  const [showMap, setShowMap] = useState(true)
  const [activeType, setActiveType] = useState("All")

  return (
    <div className="flex flex-col flex-1">
      {/* Hero banner */}
      <div className="bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
            Find Your Perfect Rental
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg">
            Search apartments, houses, and condos for rent in your area. Filter by price, beds, and amenities to find the perfect fit.
          </p>
          <div className="flex items-center gap-3 max-w-2xl">
            <div className="flex-1 flex items-center bg-card border border-border rounded-lg px-3">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="City, neighborhood, or ZIP" className="w-full px-3 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none" />
            </div>
            <Button className="px-6 py-3 h-auto">Search</Button>
          </div>
          <div className="flex items-center gap-3 mt-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <button
              onClick={() => setActiveType("All")}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors shrink-0 ${activeType === "All" ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
            >
              All Rentals
            </button>
            {rentalTypes.map((type) => (
              <button
                key={type.label}
                onClick={() => setActiveType(type.label)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border transition-colors shrink-0 ${activeType === type.label ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-card border-b border-border px-4 py-2.5">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {["Price", "Beds", "Pet Friendly"].map((label) => (
              <button key={label} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full border border-border text-foreground hover:border-foreground/30 transition-colors shrink-0">
                {label} <ChevronDown className="h-3 w-3" />
              </button>
            ))}
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full border border-border text-foreground hover:border-foreground/30 transition-colors shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5" /> More
            </button>
          </div>
          <div className="hidden md:flex items-center gap-0 border border-border rounded-lg overflow-hidden">
            <button onClick={() => setShowMap(true)} className={`p-2 transition-colors ${showMap ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`} aria-label="Map view">
              <Map className="h-4 w-4" />
            </button>
            <button onClick={() => setShowMap(false)} className={`p-2 transition-colors ${!showMap ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`} aria-label="List view">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 flex">
        <div className={`${showMap ? "w-full lg:w-1/2 xl:w-[55%]" : "w-full"} overflow-y-auto`}>
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm text-foreground"><span className="font-bold">{rentalProperties.length}</span> rentals available</p>
          </div>
          <div className={`p-4 grid gap-4 ${showMap ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1280px] mx-auto"}`}>
            {rentalProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Renter resources */}
          <div className={`px-4 py-10 ${!showMap ? "max-w-[1280px] mx-auto" : ""}`}>
            <h2 className="text-lg font-bold text-foreground mb-6">Renter Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: DollarSign, title: "Affordability Calculator", desc: "Calculate how much rent you can afford based on your income and expenses." },
                { icon: Shield, title: "Renter's Insurance", desc: "Protect your belongings with affordable renter's insurance options." },
                { icon: Zap, title: "Application Tips", desc: "Stand out with our guide to completing the perfect rental application." },
              ].map((res) => (
                <div key={res.title} className="p-5 border border-border rounded-lg bg-card">
                  <res.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-sm font-bold text-foreground mb-1">{res.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{res.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showMap && (
          <div className="hidden lg:block flex-1 sticky top-[60px] h-[calc(100vh-60px)]">
            <MapView properties={rentalProperties} />
          </div>
        )}
      </div>

      {!showMap && <Footer />}
    </div>
  )
}
