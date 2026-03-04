"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Bath, BedDouble, Maximize, MessageCircle } from "lucide-react"
import type { PropertyData } from "@/lib/data"

export function PropertyCard({ property }: { property: PropertyData }) {
  const [saved, setSaved] = useState(false)

  const detailHref = property.isRental
    ? `/rent/${property.id}`
    : `/buy/${property.id}`

  return (
    <article className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
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
      <Link href={detailHref} className="block p-3">
        <p className="text-lg font-bold text-foreground">{property.price}</p>
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

      {/* WhatsApp quick enquiry */}
      <div className="px-3 pb-3">
        <a
          href={`https://wa.me/917767805544?text=${encodeURIComponent(`Hi, I am interested in the property: ${property.address}, ${property.city}. Please share more details.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-md bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Quick WhatsApp Enquiry
        </a>
      </div>
    </article>
  )
}
