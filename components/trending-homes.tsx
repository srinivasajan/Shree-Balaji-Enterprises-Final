"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, MessageCircle } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { buyProperties } from "@/lib/data"
import { Button } from "@/components/ui/button"

export function TrendingHomes() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -340 : 340,
        behavior: "smooth",
      })
    }
  }

  // When only 1 property, render a wide spotlight card
  if (buyProperties.length === 1) {
    const p = buyProperties[0]
    return (
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Featured Property</h2>
            <p className="text-sm text-muted-foreground mt-1">Our latest listing in {p.city}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-0 overflow-hidden rounded-xl border border-border shadow-md bg-card">
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[280px] shrink-0">
              <Image src={p.image} alt={p.address} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              {p.tag && (
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">{p.tag}</span>
              )}
            </div>
            {/* Details */}
            <div className="flex-1 p-7 flex flex-col justify-between">
              <div>
                <p className="text-2xl font-bold text-primary mb-1">{p.price}</p>
                <p className="text-base font-semibold text-foreground">{p.address}</p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 shrink-0" />{p.city}
                </p>
                {p.description && (
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-4">{p.description}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href={`/buy/${p.id}`} className="flex-1">
                  <Button className="w-full">View Details</Button>
                </Link>
                <a
                  href={`https://wa.me/917767805544?text=${encodeURIComponent(`Hi, I am interested in the property at ${p.address}, ${p.city} priced at ${p.price}. Please share more details.`)}`}
                  target="_blank" rel="noopener noreferrer" className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Quick Enquiry
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Properties in Your Area</h2>
            <p className="text-sm text-muted-foreground mt-1">Latest listings across Mumbai Metropolitan Region</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll("left")} className="p-2 rounded-full border border-border hover:bg-muted transition-colors" aria-label="Scroll left">
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button onClick={() => scroll("right")} className="p-2 rounded-full border border-border hover:bg-muted transition-colors" aria-label="Scroll right">
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
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
