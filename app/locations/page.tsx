import Link from "next/link"
import {
  MapPin,
  ArrowRight,
  Building2,
  Home,
  TrendingUp,
  MessageCircle,
  Train,
  Trees,
  Landmark,
  Warehouse,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const locations = [
  {
    id: "ambernath",
    name: "Ambernath",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ambarnath_Shiva_Temple_1.jpg/960px-Ambarnath_Shiva_Temple_1.jpg",
    tagline: "Our Home Ground",
    description:
      "Ambernath is where Shree Balaji Enterprises was founded. A vibrant mix of residential pockets, industrial zones and emerging new projects — all within Central Railway reach.",
    highlights: ["Residential Flats", "Industrial Sheds", "Bungalows", "Plots & Land"],
    badge: "HQ",
    badgeClass: "bg-primary text-white",
    searchQuery: "Ambernath",
    distance: "65 km from CST",
    icon: Building2,
  },
  {
    id: "badlapur",
    name: "Badlapur",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/City_of_Lights%2C_Shadows_of_Hills.jpg/960px-City_of_Lights%2C_Shadows_of_Hills.jpg",
    tagline: "Nature's Address",
    description:
      "Surrounded by hills, rivers and open greenery — Badlapur is the go-to for affordable 1-3 BHK flats and scenic farmhouses. Ideal for first-time homebuyers.",
    highlights: ["1 & 2 BHK Flats", "Farmhouses", "Gated Projects", "Plots"],
    badge: "Affordable",
    badgeClass: "bg-emerald-500 text-white",
    searchQuery: "Badlapur",
    distance: "72 km from CST",
    icon: Trees,
  },
  {
    id: "ulhasnagar",
    name: "Ulhasnagar",
    region: "Thane District",
    image:
      "https://images.pexels.com/photos/14436470/pexels-photo-14436470.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tagline: "Budget-Friendly Urban Hub",
    description:
      "One of the most affordable urban markets in the MMR. Ulhasnagar is dense, commercial-forward and packed with value for investors and end-users alike.",
    highlights: ["Budget Flats", "Shops & Offices", "Commercial Spaces", "Resale Deals"],
    badge: "Budget Hub",
    badgeClass: "bg-blue-500 text-white",
    searchQuery: "Ulhasnagar",
    distance: "59 km from CST",
    icon: Building2,
  },
  {
    id: "kalyan",
    name: "Kalyan",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kala_Talao_1.jpg/960px-Kala_Talao_1.jpg",
    tagline: "The Growth Corridor",
    description:
      "A major rail junction and Tier-2 urban centre, Kalyan is expanding fast. New residential projects, malls and highways are driving strong appreciation.",
    highlights: ["New Projects", "Residential", "Commercial", "Plots"],
    badge: "High Growth",
    badgeClass: "bg-orange-500 text-white",
    searchQuery: "Kalyan",
    distance: "54 km from CST",
    icon: TrendingUp,
  },
  {
    id: "dombivli",
    name: "Dombivli",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Dombivli%2C_Maharashtra_421201_to_204%2C_India_-_panoramio.jpg/960px-Dombivli%2C_Maharashtra_421201_to_204%2C_India_-_panoramio.jpg",
    tagline: "Planned & Peaceful",
    description:
      "Known for its clean, well-planned layout and middle-class residential character, Dombivli offers great value with excellent schools, hospitals and railways.",
    highlights: ["2 & 3 BHK Flats", "Row Houses", "Societies", "Resale"],
    badge: "Family Favourite",
    badgeClass: "bg-violet-500 text-white",
    searchQuery: "Dombivli",
    distance: "52 km from CST",
    icon: Home,
  },
  {
    id: "thane",
    name: "Thane",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Talao_Pali_%28425538069%29.jpg/960px-Talao_Pali_%28425538069%29.jpg",
    tagline: "The City of Lakes",
    description:
      "Thane blends premium high-rises with serene lakeside living. Well-connected, well-developed and well-loved — it's one of Maharashtra's fastest-growing cities.",
    highlights: ["Premium Flats", "Luxury Projects", "Offices", "Shops"],
    badge: "Premium",
    badgeClass: "bg-amber-500 text-white",
    searchQuery: "Thane",
    distance: "34 km from CST",
    icon: Landmark,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    region: "Mumbai District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Mumbai_Skyline_Marine_Drive_Night.jpg/960px-Mumbai_Skyline_Marine_Drive_Night.jpg",
    tagline: "The Maximum City",
    description:
      "India's commercial capital — where every square foot is prime. We assist with residential, commercial and investment properties across Mumbai's diverse neighbourhoods.",
    highlights: ["Premium Flats", "Commercial Offices", "Showrooms", "Investment"],
    badge: "Iconic",
    badgeClass: "bg-rose-500 text-white",
    searchQuery: "Mumbai",
    distance: "City",
    icon: Landmark,
  },
  {
    id: "navi-mumbai",
    name: "Navi Mumbai",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Vashi_Skyline.jpg/960px-Vashi_Skyline.jpg",
    tagline: "India's Planned Dream City",
    description:
      "Wide roads, green belts and a meticulously planned layout make Navi Mumbai one of the most liveable cities in the country. Airport incoming, values are rising.",
    highlights: ["New Launches", "IT Offices", "Premium Flats", "Plots"],
    badge: "Rapid Growth",
    badgeClass: "bg-cyan-500 text-white",
    searchQuery: "Navi Mumbai",
    distance: "15 km from CST",
    icon: TrendingUp,
  },
  {
    id: "panvel",
    name: "Panvel",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Viewing_Panvel_from_Karnala_hills_%285444402729%29.jpg/960px-Viewing_Panvel_from_Karnala_hills_%285444402729%29.jpg",
    tagline: "Gateway to Konkan",
    description:
      "Panvel is a booming investment destination thanks to the upcoming Navi Mumbai International Airport. Strategic location at expressway and railway junctions.",
    highlights: ["Affordable Flats", "Plots", "New Projects", "Commercial"],
    badge: "Airport Zone",
    badgeClass: "bg-sky-500 text-white",
    searchQuery: "Panvel",
    distance: "35 km from CST",
    icon: Train,
  },
  {
    id: "titwala",
    name: "Titwala",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ganesh_Talav%2C_Titwala_05.jpg/960px-Ganesh_Talav%2C_Titwala_05.jpg",
    tagline: "Spiritual & Serene",
    description:
      "A quaint temple town on the Central Railway with some of the most affordable property rates in the MMR. Ideal for budget buyers and investors looking for low-entry plots.",
    highlights: ["Budget Flats", "Plots", "Row Houses", "Agricultural Land"],
    badge: "Ultra Affordable",
    badgeClass: "bg-lime-500 text-white",
    searchQuery: "Titwala",
    distance: "58 km from CST",
    icon: Home,
  },
  {
    id: "khopoli",
    name: "Khopoli",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mumbai_Pune_expressway.jpg/960px-Mumbai_Pune_expressway.jpg",
    tagline: "Industrial Belt & Getaway",
    description:
      "Adjacent to the Mumbai-Pune Expressway, Khopoli is home to several MIDC industrial estates alongside hill resorts and farmhouse destinations.",
    highlights: ["Industrial Plots", "Warehouses", "Farmhouses", "MIDC Units"],
    badge: "Industrial",
    badgeClass: "bg-slate-600 text-white",
    searchQuery: "Khopoli",
    distance: "83 km from CST",
    icon: Warehouse,
  },
  {
    id: "karjat",
    name: "Karjat",
    region: "Raigad District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kondana.jpg/960px-Kondana.jpg",
    tagline: "Mumbai's Weekend Escape",
    description:
      "Lush valleys, rivers and cool air make Karjat the premier second-home destination for Mumbaikars. Farm plots, bungalows and eco-resorts are in high demand.",
    highlights: ["Farmhouses", "Bungalows", "Agricultural Plots", "Resorts"],
    badge: "Second Home",
    badgeClass: "bg-green-600 text-white",
    searchQuery: "Karjat",
    distance: "95 km from CST",
    icon: Trees,
  },
  {
    id: "murbad",
    name: "Murbad",
    region: "Thane District",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Sunset_Sunrise_Bhimashankar_Wildlife_Sanctuary_Pune_%281%29_02.jpg/960px-Sunset_Sunrise_Bhimashankar_Wildlife_Sanctuary_Pune_%281%29_02.jpg",
    tagline: "Countryside at Low Prices",
    description:
      "Murbad offers large land parcels and affordable agricultural plots for those looking to invest in the fringe of MMR. Peaceful, green and growing steadily.",
    highlights: ["Agricultural Land", "NA Plots", "Farmhouses", "Industrial Land"],
    badge: "Emerging",
    badgeClass: "bg-yellow-600 text-white",
    searchQuery: "Murbad",
    distance: "82 km from CST",
    icon: Trees,
  },
]

export default function LocationsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[480px] flex items-end">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=85"
            alt="Mumbai Metropolitan Region cityscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 pt-32 pb-16 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <MapPin className="h-3.5 w-3.5" />
                Mumbai Metropolitan Region
              </div>
              <h1 className="text-4xl md:text-[60px] font-black text-white leading-[1.0] tracking-tight mb-4">
                Areas We<br />
                <span className="text-primary">Proudly Serve.</span>
              </h1>
              <p className="text-base text-white/60 max-w-lg leading-relaxed">
                15+ years of on-the-ground expertise across 13+ cities — from Ambernath to Mumbai,
                Karjat to Navi Mumbai. We know every neighbourhood, every price point.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/contact">
                <Button size="lg" className="h-12 px-7 text-sm font-bold shadow-lg shadow-primary/30">
                  Talk to Us <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/buy">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-7 text-sm font-bold bg-white/10 border-white/60 text-white hover:bg-white/20 hover:border-white"
                >
                  Browse All
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className="py-10 border-b border-border bg-card">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {[
              { value: "13+", label: "Cities Covered", sub: "Across Maharashtra" },
              { value: "500+", label: "Properties Sold", sub: "Across MMR" },
              { value: "65+", label: "Km Radius", sub: "From Ambernath" },
              { value: "15+", label: "Years Local Know-How", sub: "Since 2010" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-8 px-4 gap-0.5 text-center bg-card"
              >
                <p className="text-3xl md:text-4xl font-black text-foreground">{s.value}</p>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 text-center">
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Explore Locations</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
            Find Your City,<br />
            <span className="text-muted-foreground font-light italic">Find Your Home.</span>
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Click on any location below to browse available properties. Don&apos;t see yours?{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact us
            </Link>{" "}
            — we cover more areas every day.
          </p>
        </div>
      </section>

      {/* ── LOCATIONS GRID ────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/buy?q=${encodeURIComponent(loc.searchQuery)}`}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.image}
                    alt={`${loc.name} real estate — Shree Balaji Enterprises`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badge */}
                  <span
                    className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${loc.badgeClass}`}
                  >
                    {loc.badge}
                  </span>

                  {/* Location name overlaid on image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-black text-white leading-tight">{loc.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-white/60 shrink-0" />
                          <span className="text-xs text-white/60 font-medium">{loc.region}</span>
                        </div>
                      </div>
                      <span className="shrink-0 text-[11px] font-semibold text-white/50 mt-1 whitespace-nowrap">
                        {loc.distance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-1">
                    {loc.tagline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {loc.description}
                  </p>

                  {/* Property type pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {loc.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center px-2.5 py-1 bg-muted rounded-full text-[11px] font-semibold text-muted-foreground"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Browse Properties
                    </span>
                    <span className="h-8 w-8 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors">
                      <ArrowRight className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────── */}
      <section className="py-20 bg-foreground">
        <div className="mx-auto max-w-[1280px] px-4 text-center">
          <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">
            Need Local Guidance?
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
            Not Sure Which Area<br />
            <span className="text-primary">Is Right for You?</span>
          </h2>
          <p className="text-[15px] text-white/60 max-w-xl mx-auto leading-relaxed mb-8">
            With 15+ years of boots-on-the-ground experience across the MMR, we&apos;ll help you find
            the area that fits your budget, lifestyle and commute — for free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917767805544?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20location%20for%20my%20property%20search."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                className="h-12 px-8 text-sm font-bold"
              >
                Contact Our Team <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
