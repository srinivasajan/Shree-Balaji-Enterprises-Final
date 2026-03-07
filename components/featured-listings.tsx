"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react"
import { useFeaturedProperties } from "@/hooks/use-properties"
import { Button } from "@/components/ui/button"

// Total visible card layers in the deck (top card + ghost cards peeking below)
const DECK_DEPTH = 3
const LAYER_OFFSET = 10
const LAYER_SCALE = 0.03

function PlaceholderCard() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full rounded-xl border border-border bg-muted/40 overflow-hidden">
      <div className="h-44 w-full md:h-full md:w-[45%] md:shrink-0 bg-muted animate-pulse" />
      <div className="flex-1 p-4 md:p-6 flex flex-col gap-3">
        <div className="h-5 w-28 bg-muted rounded animate-pulse" />
        <div className="h-4 w-44 bg-muted rounded animate-pulse mt-1" />
        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        <div className="flex-1" />
        <div className="h-3 w-52 bg-muted rounded animate-pulse" />
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}

type Phase = "idle" | "exiting" | "resetting"

function cardStyle(
  depth: number,
  phase: Phase,
  exitDir: "left" | "right",
): React.CSSProperties {
  const transition =
    phase === "resetting"
      ? "none"
      : "transform 420ms cubic-bezier(0.4,0,0.2,1), opacity 360ms ease"

  if (phase === "exiting" && depth === 0) {
    return {
      transform: `translateX(${exitDir === "left" ? "-115%" : "115%"}) scale(1)`,
      opacity: 0,
      zIndex: DECK_DEPTH - depth,
      transition,
      position: "absolute",
      inset: 0,
    }
  }

  const effectiveDepth = phase === "exiting" && depth > 0 ? depth - 1 : depth
  const offsetPx = effectiveDepth * LAYER_OFFSET
  const scale = 1 - effectiveDepth * LAYER_SCALE

  return {
    transform: `translateY(${offsetPx}px) translateX(${offsetPx}px) scale(${scale})`,
    opacity: 1,
    zIndex: DECK_DEPTH - depth,
    transition,
    position: "absolute",
    inset: 0,
  }
}

export function FeaturedListings() {
  const featured = useFeaturedProperties()
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const [exitDir, setExitDir] = useState<"left" | "right">("left")

  const total = featured.length
  if (total === 0) return null

  const navigate = (dir: "left" | "right") => {
    if (phase !== "idle" || total <= 1) return
    setExitDir(dir)
    setPhase("exiting")

    setTimeout(() => {
      setCurrent((prev) =>
        dir === "left" ? (prev + 1) % total : (prev - 1 + total) % total
      )
      setPhase("resetting")
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("idle"))
      )
    }, 440)
  }

  const layers = Array.from({ length: DECK_DEPTH }, (_, depth) => ({
    depth,
    property: featured[(current + depth) % total],
    isReal: depth < total,
  }))

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Featured Properties
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Handpicked listings from Shree Balaji Enterprises
            </p>
          </div>
          <div className="flex items-center gap-3">
            {total > 1 && (
              <>
                <button
                  onClick={() => navigate("right")}
                  disabled={phase !== "idle"}
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
                  disabled={phase !== "idle"}
                  className="p-2 rounded-full border border-border hover:bg-muted transition-colors disabled:opacity-40"
                  aria-label="Next property"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}
            <Link
              href="/buy"
              className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 ml-2"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/*
          Deck container — fixed height + overflow-visible for peeking layers.
        */}
        <div
          className="relative overflow-visible h-[480px] md:h-[320px]"
        >
          {/* Render deepest first so top card paints on top */}
          {[...layers].reverse().map(({ depth, property: prop, isReal }) => (
            <div key={`layer-${depth}`} style={cardStyle(depth, phase, exitDir)}>
              {isReal ? (
                /* ── Real horizontal property card ── */
                <div className="flex flex-col md:flex-row h-full w-full rounded-xl border border-border shadow-md bg-card overflow-hidden">
                  {/* Image */}
                  <div className="relative h-44 w-full md:h-full md:w-[45%] md:shrink-0">
                    <Image
                      src={prop.image}
                      alt={prop.address}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 576px"
                      draggable={false}
                    />
                    {prop.tag && (
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">
                        {prop.tag}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                        Featured Listing
                      </p>
                      <p className="text-xl font-bold text-foreground mb-1 truncate">
                        {prop.address}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {prop.city}
                      </p>
                      <p className="text-lg font-bold text-primary mb-3">
                        {prop.price}
                      </p>
                      {prop.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                          {prop.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-row gap-2 mt-4">
                      <Link href={`/buy/${prop.id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          View Full Details
                        </Button>
                      </Link>
                      <a
                        href={`https://wa.me/917767805544?text=${encodeURIComponent(
                          `Hi, I am interested in ${prop.address}, ${prop.city}. Please share details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" variant="outline" className="w-full">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 mr-1.5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          WhatsApp Enquiry
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Placeholder skeleton ── */
                <PlaceholderCard />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

