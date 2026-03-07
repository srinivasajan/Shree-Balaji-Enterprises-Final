import Link from "next/link"
import { Home, Building2, Trees, Building, Warehouse, TentTree } from "lucide-react"

const homeTypes = [
  { icon: Home, label: "Residential", count: "Flats, Bungalows, Villas", href: "/buy?q=Residential" },
  { icon: Building2, label: "Apartments", count: "1/2/3 BHK Flats", href: "/buy?q=Apartment" },
  { icon: Building, label: "Commercial", count: "Shops, Offices, Showrooms", href: "/buy?q=Commercial" },
  { icon: Warehouse, label: "Industrial", count: "Warehouses, Godowns", href: "/buy?q=Industrial" },
  { icon: Trees, label: "Row Houses", count: "Villas & Row Houses", href: "/buy?q=Row+House" },
  { icon: TentTree, label: "Plots & Land", count: "Residential & Commercial", href: "/buy?q=Plot" },
]

export function ExploreTypes() {
  return (
    <section className="py-10 md:py-14 bg-muted/50">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Property Types We Deal In
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          Residential, Commercial &amp; Industrial properties across Mumbai Metropolitan Region
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {homeTypes.map((type) => (
            <Link
              key={type.label}
              href={type.href}
              className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <type.icon className="h-7 w-7 md:h-8 md:w-8 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <p className="text-xs md:text-sm font-semibold text-foreground">{type.label}</p>
                <p className="hidden sm:block text-xs text-muted-foreground mt-0.5">{type.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
