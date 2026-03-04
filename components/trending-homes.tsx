"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { buyProperties } from "@/lib/data"

export function TrendingHomes() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Properties in Your Area
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Latest listings across Mumbai Metropolitan Region
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {buyProperties.map((property) => (
            <div key={property.id} className="min-w-[280px] md:min-w-[300px] snap-start">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
