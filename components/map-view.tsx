"use client"

import { useState } from "react"
import { MapPin, Minus, Plus, Maximize2 } from "lucide-react"
import type { PropertyData } from "@/lib/data"

export function MapView({ properties }: { properties: PropertyData[] }) {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)

  // This is a static map UI mockup. In production, you'd integrate Mapbox/Google Maps here.
  return (
    <div className="relative w-full h-full bg-[#e8edf0] overflow-hidden select-none">
      {/* Map background with street grid pattern */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d1d9e0" strokeWidth="0.5" />
          </pattern>
          <pattern id="road-h" width="200" height="4" patternUnits="userSpaceOnUse">
            <rect width="200" height="4" fill="#fff" />
          </pattern>
          <pattern id="road-v" width="4" height="200" patternUnits="userSpaceOnUse">
            <rect width="4" height="200" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Simulated roads */}
        <rect x="0" y="25%" width="100%" height="3" fill="#fff" rx="1" />
        <rect x="0" y="50%" width="100%" height="4" fill="#ffd" rx="1" />
        <rect x="0" y="75%" width="100%" height="3" fill="#fff" rx="1" />
        <rect x="20%" y="0" width="3" height="100%" fill="#fff" rx="1" />
        <rect x="50%" y="0" width="4" height="100%" fill="#ffd" rx="1" />
        <rect x="80%" y="0" width="3" height="100%" fill="#fff" rx="1" />
        {/* Parks / green areas */}
        <rect x="22%" y="27%" width="12%" height="10%" fill="#c8e6c9" rx="4" opacity="0.6" />
        <rect x="60%" y="55%" width="15%" height="8%" fill="#c8e6c9" rx="4" opacity="0.6" />
      </svg>

      {/* Property pins positioned across the map */}
      {properties.slice(0, 8).map((property, index) => {
        // Distribute pins across the map area
        const positions = [
          { left: "15%", top: "20%" },
          { left: "35%", top: "35%" },
          { left: "60%", top: "15%" },
          { left: "75%", top: "45%" },
          { left: "25%", top: "60%" },
          { left: "50%", top: "70%" },
          { left: "70%", top: "25%" },
          { left: "40%", top: "50%" },
        ]
        const pos = positions[index]
        const isHovered = hoveredPin === property.id

        return (
          <button
            key={property.id}
            className={`absolute transform -translate-x-1/2 -translate-y-full transition-all z-10 ${
              isHovered ? "z-30 scale-110" : "hover:z-20 hover:scale-105"
            }`}
            style={{ left: pos.left, top: pos.top }}
            onMouseEnter={() => setHoveredPin(property.id)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <div
              className={`px-2 py-1 rounded-lg text-xs font-bold shadow-md transition-colors ${
                isHovered
                  ? "bg-foreground text-card"
                  : "bg-card text-foreground border border-border"
              }`}
            >
              {property.price}
            </div>
            {/* Pin triangle */}
            <div className="flex justify-center -mt-px">
              <div
                className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent transition-colors ${
                  isHovered ? "border-t-foreground" : "border-t-card"
                }`}
              />
            </div>

            {/* Tooltip on hover */}
            {isHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card rounded-lg shadow-xl border border-border p-2 min-w-[200px] z-40">
                <p className="text-sm font-bold text-foreground">{property.price}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {property.beds} bd | {property.baths} ba | {property.sqft} sqft
                </p>
                <p className="text-xs text-muted-foreground truncate">{property.address}</p>
              </div>
            )}
          </button>
        )
      })}

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <button className="p-2 bg-card rounded-md shadow-md border border-border hover:bg-muted transition-colors" aria-label="Zoom in">
          <Plus className="h-4 w-4 text-foreground" />
        </button>
        <button className="p-2 bg-card rounded-md shadow-md border border-border hover:bg-muted transition-colors" aria-label="Zoom out">
          <Minus className="h-4 w-4 text-foreground" />
        </button>
        <button className="p-2 bg-card rounded-md shadow-md border border-border hover:bg-muted transition-colors mt-1" aria-label="Fullscreen">
          <Maximize2 className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground bg-card/80 px-2 py-0.5 rounded">
        Map data placeholder - integrate Mapbox or Google Maps
      </div>
    </div>
  )
}
