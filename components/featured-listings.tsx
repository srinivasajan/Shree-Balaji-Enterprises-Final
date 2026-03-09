"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useFeaturedProperties } from "@/hooks/use-properties"
import { PropertyCard } from "@/components/property-card"



export function FeaturedListings() {
  const featured = useFeaturedProperties()
  const displayed = featured.slice(0, 3)

  if (displayed.length === 0) return null

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-3">Handpicked</p>
            <h2 className="text-2xl md:text-4xl font-black text-foreground">
              Featured Properties
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Handpicked listings from Shree Balaji Enterprises
            </p>
          </div>
          <Link
            href="/buy"
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 self-start mt-1"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayed.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>
    </section>
  )
}

