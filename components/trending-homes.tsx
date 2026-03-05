"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, MessageCircle } from "lucide-react"
import { buyProperties } from "@/lib/data"
import { Button } from "@/components/ui/button"

const DECK_DEPTH = 3
const LAYER_OFFSET = 10
const LAYER_SCALE = 0.03
const ANIM_MS = 480

// ---------------------------------------------------------------------------
// Placeholder skeleton shown in background deck layers
// ---------------------------------------------------------------------------
function PlaceholderCard() {
  return (
    <div className="flex h-full w-full rounded-xl border border-border bg-muted/40 overflow-hidden">
      <div className="w-[45%] shrink-0 bg-muted animate-pulse" />
      <div className="flex-1 p-6 flex flex-col gap-3">
        <div className="h-5 w-28 bg-muted rounded animate-pulse" />
        <div className="h-4 w-44 bg-muted rounded animate-pulse mt-1" />
        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        <div className="flex-1" />
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Single property card content
// ---------------------------------------------------------------------------
function PropertyCard({ prop }: { prop: (typeof buyProperties)[0] }) {
  return (
    <div className="flex h-full w-full rounded-xl border border-border shadow-md bg-card overflow-hidden">
      <div className="relative w-[45%] shrink-0">
        <Image
          src={prop.image}
          alt={prop.address}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 576px"
          draggable={false}
        />
        {prop.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">
            {prop.tag}
          </span>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-xl font-bold text-primary mb-1 truncate">{prop.price}</p>
          <p className="text-sm font-semibold text-foreground truncate">{prop.address}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-3">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {prop.city}
          </p>
          {prop.description && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {prop.description}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Link href={`/buy/${prop.id}`} className="flex-1">
            <Button size="sm" className="w-full">View Details</Button>
          </Link>
          <a
            href={`https://wa.me/917767805544?text=${encodeURIComponent(
              `Hi, I am interested in the property at ${prop.address}, ${prop.city} priced at ${prop.price}. Please share more details.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button size="sm" variant="outline" className="w-full">
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              Quick Enquiry
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component — two-card crossfade, no phase state machine
// ---------------------------------------------------------------------------
export function TrendingHomes() {
  const total = buyProperties.length
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState<{ index: number; dir: "left" | "right" } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (total === 0) return null

  const navigate = (dir: "left" | "right") => {
    if (exiting) return
    const next = dir === "left" ? (current + 1) % total : (current - 1 + total) % total
    setExiting({ index: current, dir })
    setCurrent(next)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setExiting(null), ANIM_MS + 50)
  }

  const topProp = buyProperties[current]

  // Background deck layers (depth 1, 2…) — always the cards after current
  const bgLayers = Array.from({ length: DECK_DEPTH - 1 }, (_, i) => {
    const depth = i + 1
    const idx = (current + depth) % total
    const offsetPx = depth * LAYER_OFFSET
    const scale = 1 - depth * LAYER_SCALE
    return { depth, prop: buyProperties[idx], offsetPx, scale }
  })

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Trending Properties</h2>
            <p className="text-sm text-muted-foreground mt-1">Our latest listings in {topProp.city}</p>
          </div>
          {total > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("right")}
                disabled={!!exiting}
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-40"
                aria-label="Previous property"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <span className="text-sm text-muted-foreground select-none w-12 text-center">
                {current + 1}&nbsp;/&nbsp;{total}
              </span>
              <button
                onClick={() => navigate("left")}
                disabled={!!exiting}
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-40"
                aria-label="Next property"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          )}
        </div>

        {/* Deck */}
        <div
          className="relative overflow-visible"
          style={{ height: `calc(300px + ${(DECK_DEPTH - 1) * LAYER_OFFSET}px)` }}
        >
          {/* Background ghost layers */}
          {[...bgLayers].reverse().map(({ depth, prop, offsetPx, scale }) => (
            <div
              key={`bg-${depth}`}
              className="absolute inset-0"
              style={{
                transform: `translateY(${offsetPx}px) translateX(${offsetPx}px) scale(${scale})`,
                opacity: 1 - depth * 0.2,
                zIndex: DECK_DEPTH - depth,
              }}
            >
              <PropertyCard prop={prop} />
            </div>
          ))}

          {/* Outgoing card (animates out) */}
          {exiting && (
            <div
              key={`exit-${exiting.index}`}
              className={`absolute inset-0 ${exiting.dir === "left" ? "card-exit-left" : "card-exit-right"}`}
              style={{ zIndex: DECK_DEPTH + 1 }}
            >
              <PropertyCard prop={buyProperties[exiting.index]} />
            </div>
          )}

          {/* Incoming card (animates in) */}
          <div
            key={`enter-${current}`}
            className={`absolute inset-0 ${exiting ? (exiting.dir === "left" ? "card-enter-right" : "card-enter-left") : ""}`}
            style={{ zIndex: DECK_DEPTH }}
          >
            <PropertyCard prop={topProp} />
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          More listings being added soon — check back often.
        </p>
      </div>
    </section>
  )
}

