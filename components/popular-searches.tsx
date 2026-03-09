import Link from "next/link"

const popularCities = [
  { name: "Ambernath", homes: "Residential & Commercial" },
  { name: "Badlapur", homes: "Residential & Plots" },
  { name: "Ulhasnagar", homes: "Residential & Commercial" },
  { name: "Thane", homes: "Flats, Offices & Shops" },
  { name: "Raigad", homes: "Plots & Land" },
  { name: "Mumbai", homes: "Flats & Commercial" },
  { name: "Navi Mumbai", homes: "Apartments & Offices" },
  { name: "Kalyan-Dombivli", homes: "Residential & Commercial" },
  { name: "Vasai-Virar", homes: "Flats & Row Houses" },
  { name: "Mira-Bhayandar", homes: "Apartments & Shops" },
  { name: "Panvel", homes: "Plots & Residential" },
  { name: "Palghar", homes: "Farmhouses & Plots" },
  { name: "Alibag", homes: "Villas & Bungalows" },
]

export function PopularSearches() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4">
        <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Coverage</p>
        <h2 className="text-2xl md:text-4xl font-black text-foreground mb-8">
          Areas We Serve
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
          {popularCities.map((city) => (
            <Link
              key={city.name}
              href={`/buy?q=${encodeURIComponent(city.name)}`}
              className="flex items-center justify-between py-3 border-b border-border hover:border-primary transition-colors group"
            >
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {city.name}
              </span>
              <span className="hidden sm:block text-xs text-muted-foreground shrink-0 ml-2">
                {city.homes}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
