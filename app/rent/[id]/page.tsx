"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Heart, Share2, ChevronLeft, ChevronRight, MapPin,
  BedDouble, Bath, Maximize, Calendar, Check, Phone, Mail,
  Dog, Car, Waves, Dumbbell, Shield, Wifi
} from "lucide-react"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { getPropertyById, rentalProperties, formatAddress } from "@/lib/data"

const amenities = [
  { icon: Dog, label: "Pet Friendly" },
  { icon: Car, label: "Parking Included" },
  { icon: Waves, label: "Pool" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Wifi, label: "High-Speed Internet" },
]

export default function RentalDetailPage() {
  const params = useParams()
  const property = getPropertyById(Number(params.id))
  const [currentImage, setCurrentImage] = useState(0)
  const [saved, setSaved] = useState(false)
  const [applied, setApplied] = useState(false)

  if (!property) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-32">
          <h1 className="text-2xl font-bold text-foreground mb-2">Rental Not Found</h1>
          <p className="text-muted-foreground mb-6">This rental listing is no longer available.</p>
          <Link href="/rent"><Button>Browse Rentals</Button></Link>
        </div>
        <Footer />
      </>
    )
  }

  const images = property.images || [property.image]
  const similar = rentalProperties.filter((p) => p.id !== property.id).slice(0, 4)

  return (
    <>
      <main className="mx-auto max-w-[1280px] px-4 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rent" className="hover:text-primary transition-colors">Rent</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{property.address}</span>
        </nav>

        {/* Gallery */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="relative aspect-[16/9] md:aspect-[2.4/1]">
            <Image src={images[currentImage]} alt={property.address} fill className="object-cover" priority />
            {images.length > 1 && (
              <>
                <button onClick={() => setCurrentImage((p) => (p - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 hover:bg-card rounded-full" aria-label="Previous image">
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button onClick={() => setCurrentImage((p) => (p + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 hover:bg-card rounded-full" aria-label="Next image">
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}
            <div className="absolute bottom-4 right-4 bg-foreground/70 text-card px-3 py-1 rounded-full text-xs font-semibold">
              {currentImage + 1} / {images.length}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => setSaved(!saved)} className="flex items-center gap-1.5 px-3 py-2 bg-card/90 rounded-full text-sm font-semibold">
                <Heart className={`h-4 w-4 ${saved ? "fill-destructive text-destructive" : "text-foreground"}`} />
                <span className="hidden md:inline text-foreground">Save</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-card/90 rounded-full text-sm font-semibold">
                <Share2 className="h-4 w-4 text-foreground" />
                <span className="hidden md:inline text-foreground">Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 pb-12">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{property.price}</h1>
              <div className="flex items-center gap-6 mt-3 text-foreground">
                <span className="flex items-center gap-1.5">
                  <BedDouble className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-bold">{property.beds}</span>
                  <span className="text-sm text-muted-foreground">beds</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-bold">{property.baths}</span>
                  <span className="text-sm text-muted-foreground">baths</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Maximize className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-bold">{property.sqft}</span>
                  <span className="text-sm text-muted-foreground">sqft</span>
                </span>
              </div>
              <p className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {formatAddress(property)}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-3">About This Rental</h2>
              <p className="text-sm text-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">Unit Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 py-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Building amenities */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Building Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((a) => (
                  <div key={a.label} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <a.icon className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lease details */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Lease Details</h2>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                  <span className="text-sm text-foreground">Monthly Rent</span>
                  <span className="text-sm font-bold text-foreground">{property.price}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <span className="text-sm text-foreground">Security Deposit</span>
                  <span className="text-sm text-foreground">{property.price}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <span className="text-sm text-foreground">Lease Term</span>
                  <span className="text-sm text-foreground">12 months</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <span className="text-sm text-foreground">Available</span>
                  <span className="text-sm text-foreground">Immediately</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Application card */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-[80px]">
              <div className="border border-border rounded-xl p-5 bg-card mb-4">
                <h3 className="text-base font-bold text-foreground mb-1">{property.price}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {property.beds} bd | {property.baths} ba | {property.sqft} sqft
                </p>

                {applied ? (
                  <div className="text-center py-6">
                    <Check className="h-10 w-10 text-primary mx-auto mb-3" />
                    <p className="text-sm font-bold text-foreground">Application Submitted!</p>
                    <p className="text-xs text-muted-foreground mt-1">You will hear back within 48 hours.</p>
                  </div>
                ) : (
                  <>
                    <input type="text" placeholder="Full name" className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-2" />
                    <input type="email" placeholder="Email address" className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-2" />
                    <input type="tel" placeholder="Phone number" className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-2" />
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-2">
                      <option value="">Move-in date</option>
                      <option>Immediately</option>
                      <option>Within 30 days</option>
                      <option>1-2 months</option>
                      <option>3+ months</option>
                    </select>
                    <textarea placeholder="Message to landlord (optional)" rows={3} className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-3 resize-none" />
                    <Button className="w-full" onClick={() => setApplied(true)}>Apply Now</Button>
                  </>
                )}
              </div>

              <div className="border border-border rounded-xl p-5 bg-card">
                <h3 className="text-base font-bold text-foreground mb-3">Schedule a Tour</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {["Today", "Tomorrow", "Sat"].map((d, i) => (
                    <button key={d} className={`px-3 py-2.5 text-xs font-semibold rounded-md border transition-colors ${i === 0 ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:border-primary"}`}>
                      {d}
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="w-full">Request Tour</Button>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Similar Rentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similar.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
