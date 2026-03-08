"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Bath, BedDouble, Maximize } from "lucide-react"
import type { PropertyData } from "@/lib/data"

export function PropertyCard({ property }: { property: PropertyData }) {
  const [saved, setSaved] = useState(false)

  const detailHref = property.isRental
    ? `/rent/${property.id}`
    : `/buy/${property.id}`

  return (
    <article className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      {/* Image */}
      <Link href={detailHref} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={`${property.address}, ${property.city}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Tag */}
        {property.tag && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded ${
              property.tagColor === "primary"
                ? "bg-primary text-primary-foreground"
                : property.tagColor === "destructive"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-foreground/80 text-card"
            }`}
          >
            {property.tag}
          </span>
        )}
        {/* Heart button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setSaved(!saved)
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-card/60 hover:bg-card/90 transition-colors"
          aria-label={saved ? "Remove from saved" : "Save property"}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              saved ? "fill-destructive text-destructive" : "text-foreground/70"
            }`}
          />
        </button>
      </Link>

      {/* Info */}
      <Link href={detailHref} className="block p-4">
        <p className="text-lg font-black text-foreground">{property.price}</p>
        {property.beds > 0 || property.baths > 0 ? (
          <div className="flex items-center gap-3 mt-1 text-sm text-foreground">
            {property.beds > 0 && (
              <span className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-semibold">{property.beds}</span>
                <span className="text-muted-foreground">bds</span>
              </span>
            )}
            {property.baths > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-semibold">{property.baths}</span>
                <span className="text-muted-foreground">ba</span>
              </span>
            )}
            {property.sqft !== "On Request" && (
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-semibold">{property.sqft}</span>
                <span className="text-muted-foreground">sqft</span>
              </span>
            )}
          </div>
        ) : (
          <p className="mt-1 text-xs font-medium text-primary">Contact for full details</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground truncate">
          {property.address}, {property.city}{property.state ? `, ${property.state}` : ""}
        </p>
        {property.daysOnMarket !== undefined && (
          <p className="mt-1 text-xs text-muted-foreground">
            {property.daysOnMarket === 0
              ? "Just listed"
              : `${property.daysOnMarket} day${property.daysOnMarket !== 1 ? "s" : ""} on market`}
          </p>
        )}
      </Link>

      {/* Action buttons */}
      <div className="px-3 pb-3 flex flex-col gap-2">
        <Link
          href={detailHref}
          className="flex items-center justify-center w-full py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Details
        </Link>
        <a
          href={`https://wa.me/917767805544?text=${encodeURIComponent(`Hi, I am interested in the property: ${property.address}, ${property.city}. Please share more details.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-md bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Quick WhatsApp Enquiry
        </a>
      </div>
    </article>
  )
}
