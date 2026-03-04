"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Heart, Share2, ChevronLeft, ChevronRight, MapPin,
  BedDouble, Bath, Maximize, Calendar, Home, Thermometer,
  Car, Building2, Clock, Star, Phone, Mail, Check, MessageCircle
} from "lucide-react"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { getPropertyById, buyProperties, formatAddress } from "@/lib/data"

export default function PropertyDetailPage() {
  const params = useParams()
  const property = getPropertyById(Number(params.id))
  const [currentImage, setCurrentImage] = useState(0)
  const [saved, setSaved] = useState(false)
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  if (!property) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-32">
          <h1 className="text-2xl font-bold text-foreground mb-2">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you are looking for does not exist.</p>
          <Link href="/buy">
            <Button>Browse Homes</Button>
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const handleContact = () => {
    const msg = encodeURIComponent(`Hi, I am interested in ${property.address}, ${property.city}.\nName: ${contactName}\nPhone: ${contactPhone}\nPlease share more details.`)
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
  }

  // Dynamic tour dates
  const today = new Date()
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
  const tourDays = [today, new Date(today.getTime() + 86400000), new Date(today.getTime() + 172800000)]

  const images = property.images || [property.image]
  const similar = buyProperties.filter((p) => p.id !== property.id).slice(0, 4)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      <main className="mx-auto max-w-[1280px] px-4 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/buy" className="hover:text-primary transition-colors">Buy</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{property.address}</span>
        </nav>

        {/* Image Gallery */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="relative aspect-[16/9] md:aspect-[2.4/1]">
            <Image
              src={images[currentImage]}
              alt={`${property.address} - Photo ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
            />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 hover:bg-card rounded-full transition-colors" aria-label="Previous image">
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 hover:bg-card rounded-full transition-colors" aria-label="Next image">
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}
            <div className="absolute bottom-4 right-4 bg-foreground/70 text-card px-3 py-1 rounded-full text-xs font-semibold">
              {currentImage + 1} / {images.length}
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button onClick={() => setSaved(!saved)} className="flex items-center gap-1.5 px-3 py-2 bg-card/90 hover:bg-card rounded-full text-sm font-semibold transition-colors">
                <Heart className={`h-4 w-4 ${saved ? "fill-destructive text-destructive" : "text-foreground"}`} />
                <span className="hidden md:inline text-foreground">Save</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-card/90 hover:bg-card rounded-full text-sm font-semibold transition-colors">
                <Share2 className="h-4 w-4 text-foreground" />
                <span className="hidden md:inline text-foreground">Share</span>
              </button>
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative w-20 h-14 rounded-md overflow-hidden border-2 transition-colors ${idx === currentImage ? "border-primary" : "border-transparent hover:border-border"}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main content grid */}
        <div className="flex flex-col lg:flex-row gap-8 pb-12">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Price & key stats */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{property.price}</h1>
                  {property.zestimate && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Market Valuation: <span className="font-semibold text-foreground">{property.zestimate}</span>
                    </p>
                  )}
                </div>
                {property.tag && (
                  <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                    property.tagColor === "primary" ? "bg-primary text-primary-foreground"
                    : property.tagColor === "destructive" ? "bg-destructive text-destructive-foreground"
                    : "bg-muted text-foreground"
                  }`}>
                    {property.tag}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6 mt-4 text-foreground">
                {property.beds > 0 && (
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-bold">{property.beds}</span>
                    <span className="text-sm text-muted-foreground">beds</span>
                  </span>
                )}
                {property.baths > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-bold">{property.baths}</span>
                    <span className="text-sm text-muted-foreground">baths</span>
                  </span>
                )}
                {property.sqft && property.sqft !== "0" && (
                  <span className="flex items-center gap-1.5">
                    <Maximize className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-bold">{property.sqft}</span>
                    <span className="text-sm text-muted-foreground">sqft</span>
                  </span>
                )}
              </div>

              <p className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {formatAddress(property)}
              </p>
            </div>

            {/* Estimated payment */}
            {property.monthlyPayment && (
              <div className="p-4 bg-muted/50 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Est. payment</p>
                    <p className="text-xl font-bold text-foreground">{property.monthlyPayment}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  </div>
                  <Link href="/home-loans" className="text-sm font-semibold text-primary hover:underline">Get pre-approved</Link>
                </div>
                {property.hoaFee && property.hoaFee !== "None" && (
                  <p className="text-xs text-muted-foreground mt-2">HOA fee: {property.hoaFee}</p>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-3">About This Home</h2>
              <p className="text-sm text-foreground leading-relaxed">{property.description}</p>
              {property.daysOnMarket !== undefined && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {property.daysOnMarket === 0 ? "Just listed today" : `Listed ${property.daysOnMarket} days ago`}
                </p>
              )}
            </div>

            {/* Key facts */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Key Facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.type && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Home className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{property.type}</p>
                    </div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Year Built</p>
                      <p className="text-sm font-semibold text-foreground">{property.yearBuilt}</p>
                    </div>
                  </div>
                )}
                {property.lotSize && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Maximize className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Lot Size</p>
                      <p className="text-sm font-semibold text-foreground">{property.lotSize}</p>
                    </div>
                  </div>
                )}
                {property.garage && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Car className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Garage</p>
                      <p className="text-sm font-semibold text-foreground">{property.garage}-car</p>
                    </div>
                  </div>
                )}
                {property.stories && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Building2 className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Stories</p>
                      <p className="text-sm font-semibold text-foreground">{property.stories}</p>
                    </div>
                  </div>
                )}
                {property.heating && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Thermometer className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Heating / Cooling</p>
                      <p className="text-sm font-semibold text-foreground">{property.heating} / {property.cooling}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 py-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Monthly cost breakdown */}
            {property.monthlyPayment && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">Monthly Cost Breakdown</h2>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                    <span className="text-sm font-semibold text-foreground">Principal & Interest</span>
                    <span className="text-sm font-bold text-foreground">{property.monthlyPayment}</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                    <span className="text-sm text-foreground">Property Tax</span>
                    <span className="text-sm text-foreground">₹{Math.round((property.priceNum || 0) * 0.001 / 12).toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                    <span className="text-sm text-foreground">Home Insurance</span>
                    <span className="text-sm text-foreground">Included</span>
                  </div>
                  {property.hoaFee && property.hoaFee !== "None" && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                      <span className="text-sm text-foreground">HOA Fees</span>
                      <span className="text-sm text-foreground">{property.hoaFee}</span>
                    </div>
                  )}
                </div>
                <Link href="/home-loans" className="inline-block mt-3 text-sm font-semibold text-primary hover:underline">
                  See home loan details
                </Link>
              </div>
            )}
          </div>

          {/* Right column - Agent contact card */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-[84px] flex flex-col gap-4">
              {/* Contact agent card */}
              {property.listingAgent && (
                <div className="border border-border rounded-xl p-5 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0">
                      <Image src={property.listingAgent.image} alt={property.listingAgent.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground">{property.listingAgent.name}</p>
                      <p className="text-xs text-muted-foreground">{property.listingAgent.company}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-foreground">{property.listingAgent.rating}</span>
                        <span className="text-xs text-muted-foreground">({property.listingAgent.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                    />
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Your mobile number"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                    />
                    <Button className="w-full mb-2" onClick={handleContact}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Enquiry via WhatsApp
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                    <a href={`tel:${property.listingAgent.phone}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Phone className="h-3.5 w-3.5" />{property.listingAgent.phone}
                    </a>
                    <a href={`mailto:${property.listingAgent.email}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                      <Mail className="h-3.5 w-3.5" />Email
                    </a>
                  </div>
                </div>
              )}

              <div className="border border-border rounded-xl p-5 bg-card">
                <h3 className="text-base font-bold text-foreground mb-3">Request a Site Visit</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {tourDays.map((day, idx) => (
                    <button
                      key={idx}
                      className={`px-2 py-2.5 text-xs font-semibold rounded-md border transition-colors text-center ${
                        idx === 0
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {fmt(day)}
                    </button>
                  ))}
                </div>
                <a
                  href={`https://wa.me/917767805544?text=${encodeURIComponent(`Hi, I would like to schedule a site visit for ${property.address}, ${property.city}. Please let me know the available time slots.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Book Site Visit via WhatsApp
                  </Button>
                </a>
              </div>

              {/* EMI estimate */}
              <div className="border border-border rounded-xl p-5 bg-card">
                <h3 className="text-base font-bold text-foreground mb-1">Home Loan Estimate</h3>
                <p className="text-xs text-muted-foreground mb-4">Indicative EMI based on current rates</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-lg font-bold text-primary">₹</span>
                  <span className="text-2xl font-bold text-foreground">{property.monthlyPayment || "Contact Us"}</span>
                  {property.monthlyPayment && <span className="text-sm text-muted-foreground">/mo</span>}
                </div>
                <Link href="/home-loans">
                  <Button variant="outline" className="w-full">Calculate EMI</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Similar Homes You May Like</h2>
          {similar.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
              <p className="text-base font-bold text-foreground mb-2">More Properties Coming Soon</p>
              <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                We regularly add new listings. Contact us via WhatsApp to get notified when new properties matching your requirements are available.
              </p>
              <a href={`https://wa.me/917767805544?text=${encodeURIComponent(`Hi, please notify me when new properties similar to ${property.address}, ${property.city} are available.`)}`} target="_blank" rel="noopener noreferrer">
                <Button>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Notified via WhatsApp
                </Button>
              </a>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
