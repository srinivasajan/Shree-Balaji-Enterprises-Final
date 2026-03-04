import Image from "next/image"
import Link from "next/link"
import { MapPin, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { buyProperties } from "@/lib/data"
import { Button } from "@/components/ui/button"

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
          <Link href="/buy" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {featured.length === 1 ? (
          /* Spotlight layout for single property */
          <div className="flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden border border-border shadow-sm">
            <div className="relative lg:w-1/2 aspect-[4/3] lg:aspect-auto">
              <Image
                src={featured[0].image}
                alt={featured[0].address}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {featured[0].tag && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded bg-primary text-primary-foreground">
                  {featured[0].tag}
                </span>
              )}
              {featured[0].daysOnMarket !== undefined && (
                <span className="absolute bottom-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-full bg-foreground/70 text-card">
                  {featured[0].daysOnMarket === 0 ? "Just Listed" : `Listed ${featured[0].daysOnMarket} days ago`}
                </span>
              )}
            </div>
            <div className="flex-1 bg-card p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-foreground mb-1">{featured[0].address}</h3>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {featured[0].city}, {featured[0].state}
                </p>
                <p className="text-2xl font-bold text-foreground mb-4">{featured[0].price}</p>
                {featured[0].description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {featured[0].description}
                  </p>
                )}
                {featured[0].features && featured[0].features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured[0].features.map((f) => (
                      <span key={f} className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-primary/5 text-primary rounded-full border border-primary/20">
                        <CheckCircle2 className="h-3 w-3" />
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/buy/${featured[0].id}`} className="flex-1">
                  <Button className="w-full">View Full Details</Button>
                </Link>
                <a
                  href={`https://wa.me/917767805544?text=${encodeURIComponent(`Hi, I am interested in ${featured[0].address}, ${featured[0].city}. Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Enquiry
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
