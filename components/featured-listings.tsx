import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import { buyProperties } from "@/lib/data"

const featured = buyProperties.slice(0, 4)

export function FeaturedListings() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Featured Properties
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Handpicked listings from Shree Balaji Enterprises
            </p>
          </div>
          <Link href="/buy" className="text-sm font-semibold text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
