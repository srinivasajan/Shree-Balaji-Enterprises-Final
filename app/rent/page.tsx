"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Search, Building2, Building, Warehouse, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { saveInquiry, nextInquiryId } from "@/lib/admin-store"
import { useRentProperties } from "@/hooks/use-properties"

const rentalTypes = [
  { icon: Building2, label: "Residential" },
  { icon: Building, label: "Commercial" },
  { icon: Warehouse, label: "Industrial" },
]

const serviceAreas = [
  "Ambernath", "Badlapur", "Ulhasnagar", "Kalyan", "Dombivli",
  "Thane", "Bhiwandi", "Mumbra", "Titwala", "Asangaon",
  "Shahapur", "Murbad", "Mumbai / Navi Mumbai",
]

function RentPageContent() {
  const searchParams = useSearchParams()
  const [activeType, setActiveType] = useState("All")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [rentArea, setRentArea] = useState("")
  const [budget, setBudget] = useState("")

  const allRentProperties = useRentProperties()
  const locationFilter = searchParams.get("q") ?? ""

  const filtered = allRentProperties.filter(p => {
    const matchType =
      activeType === "All" ||
      (p.category ?? "").toLowerCase() === activeType.toLowerCase() ||
      (p.type ?? "").toLowerCase().includes(activeType.toLowerCase())
    const q = searchQuery.trim().toLowerCase()
    const matchSearch = !q || [p.address, p.city, p.state, p.description ?? ""].join(" ").toLowerCase().includes(q)
    return matchType && matchSearch
  })

  const activeLocation = locationFilter || searchQuery.trim()

  const handleEnquiry = () => {
    if (name.trim() || phone.trim()) {
      saveInquiry({
        id: nextInquiryId(),
        name: name || "Anonymous",
        phone,
        email: "",
        interest: `Rental – ${activeType !== "All" ? activeType : "Any type"} in ${rentArea || "MMR"}`,
        message: `Budget: ${budget || "Not specified"}`,
        status: "new",
        date: new Date().toISOString(),
      })
    }
    const msg = `Hi, I am looking for a rental property.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0APreferred Area: ${encodeURIComponent(rentArea)}%0AMonthly Budget: ${encodeURIComponent(budget)}%0AType: ${encodeURIComponent(activeType)}`
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
  }

  const hasListings = allRentProperties.length > 0

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[420px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Rental properties across Mumbai Metropolitan Region"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/75 to-foreground/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 pt-20 pb-10 w-full">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Rent · Residential · Commercial · Industrial
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.05] tracking-tight mb-3">
            Find Your Perfect<br />
            <span className="text-primary">Rental in MMR.</span>
          </h1>
          <p className="text-sm text-white/60 max-w-lg mb-6">
            Shree Balaji Enterprises assists you in finding residential, commercial and industrial rental properties across Ambernath, Badlapur, Ulhasnagar and 13+ cities.
          </p>
          <div className="flex items-center gap-3 max-w-2xl mb-5">
            <div className="flex-1 flex items-center bg-card rounded-lg px-3 shadow-lg">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by city, area or property name..."
                className="w-full px-3 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <a href="https://wa.me/917767805544?text=Hi%2C%20I%20am%20looking%20for%20a%20rental%20property.%20Please%20help." target="_blank" rel="noopener noreferrer">
              <Button className="px-6 py-3 h-auto shrink-0 shadow-lg shadow-primary/30">Search via WhatsApp</Button>
            </a>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto [scrollbar-width:none]">
            <button
              onClick={() => setActiveType("All")}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors shrink-0 ${activeType === "All" ? "border-primary bg-primary text-primary-foreground" : "border-white/30 text-white/80 hover:border-white/60 hover:text-white"}`}
            >
              All Rentals
            </button>
            {rentalTypes.map((type) => (
              <button
                key={type.label}
                onClick={() => setActiveType(type.label)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border transition-colors shrink-0 ${activeType === type.label ? "border-primary bg-primary text-primary-foreground" : "border-white/30 text-white/80 hover:border-white/60 hover:text-white"}`}
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-10 w-full">
        {hasListings ? (
          /* ── LISTINGS VIEW ────────────────────────────────────── */
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filtered.length}</span> rental{filtered.length !== 1 ? "s" : ""} found
                  {activeLocation && <span className="font-semibold text-foreground"> in {activeLocation}</span>}
                  {activeType !== "All" && <span> · {activeType}</span>}
                </p>
              </div>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Building2 className="h-12 w-12 mb-4 opacity-25" />
                  <p className="font-semibold text-base">No rentals match your search</p>
                  <p className="text-sm mt-1">Try a different category or clear the search</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}
            </div>

            {/* Enquiry sidebar */}
            <div className="lg:w-[340px] shrink-0">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-base font-bold text-foreground mb-1">Rental Enquiry</h2>
                <p className="text-xs text-muted-foreground mb-4">Can&apos;t find what you need? Tell us your requirements.</p>
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Your Full Name" value={name} onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="tel" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="text" placeholder="Preferred Area" value={rentArea} onChange={e => setRentArea(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="text" placeholder="Monthly Budget (₹)" value={budget} onChange={e => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <Button className="w-full" onClick={handleEnquiry}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Enquiry
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                  We will get back to you within 2 hours.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ── COMING SOON VIEW (no listings yet) ──────────────── */
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">Coming Soon</span>
                  <h2 className="text-base font-bold text-foreground">Online Rental Listings</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  We are currently building our online rental listings portal. In the meantime, our team is actively managing rental
                  properties across the Mumbai Metropolitan Region. Send us a WhatsApp message or call us directly — we will help
                  you find the right property.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://wa.me/917767805544?text=Hi%2C%20I%20am%20looking%20for%20a%20rental." target="_blank" rel="noopener noreferrer">
                    <Button size="sm">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp Us
                    </Button>
                  </a>
                  <a href="tel:7767805544">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 7767805544
                    </Button>
                  </a>
                </div>
              </div>

              <h3 className="text-sm font-bold text-foreground mb-3">Areas We Cover for Rentals</h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((sa) => (
                  <span key={sa} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-full text-foreground">
                    <MapPin className="h-3 w-3 text-primary" />
                    {sa}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Mon–Sat: 9AM–7PM &nbsp;|&nbsp; Sun: 10AM–5PM
                </span>
              </div>
            </div>

            {/* Rental enquiry form */}
            <div className="lg:w-[380px] shrink-0">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-foreground mb-1">Rental Enquiry</h2>
                <p className="text-xs text-muted-foreground mb-5">Tell us your requirements and we will find the best match</p>
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Your Full Name *" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="tel" placeholder="Mobile Number *" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <select aria-label="Property type" className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={activeType} onChange={(e) => setActiveType(e.target.value)}>
                    <option value="All">Property Type</option>
                    <option>Residential</option>
                    <option>1 BHK / 2 BHK</option>
                    <option>Commercial</option>
                    <option>Industrial / Warehouse</option>
                  </select>
                  <input type="text" placeholder="Preferred Area (e.g. Ambernath West)" value={rentArea} onChange={(e) => setRentArea(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="text" placeholder="Monthly Budget (₹)" value={budget} onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <Button className="w-full" onClick={handleEnquiry}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Submit via WhatsApp
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                  Clicking submit will open WhatsApp with your details pre-filled. Our team will get back to you within 2 hours.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RentPage() {
  return (
    <Suspense>
      <RentPageContent />
    </Suspense>
  )
}
