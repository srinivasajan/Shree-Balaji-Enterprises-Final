"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, MessageCircle } from "lucide-react"
import { buyProperties } from "@/lib/data"
import { Button } from "@/components/ui/button"

// Total visible card layers in the deck (top card + ghost cards peeking below)
const DECK_DEPTH = 3
// Pixel offset per depth layer (how much each underlying card peeks out)
const LAYER_OFFSET = 10
// Scale reduction per depth layer
const LAYER_SCALE = 0.03

// ---------------------------------------------------------------------------
// Placeholder skeleton — shown in deck layers behind real properties
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
        <div className="h-3 w-52 bg-muted rounded animate-pulse" />
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
          <div className="flex-1 h-9 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Animation phases:
//  idle      – deck at rest, transitions ON
//  exiting   – top card flies out + depth cards shift forward, transitions ON
//  resetting – current index updated, transitions OFF (instant snap)
//  entering  – new top card starts slightly scaled-down/transparent, no transition
//              (next frame we go idle and the card animates into place)
// ---------------------------------------------------------------------------
const TRANSITION_MS = 650

type Phase = "idle" | "exiting" | "resetting" | "entering"

function cardStyle(
  depth: number,
  phase: Phase,
  exitDir: "left" | "right",
): React.CSSProperties {
  const noTransition = phase === "resetting" || phase === "entering"
  const transition = noTransition
    ? "none"
    : `transform ${TRANSITION_MS}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${Math.round(TRANSITION_MS * 0.85)}ms ease`

  // Top card flying out
  if (phase === "exiting" && depth === 0) {
    return {
      transform: `translateX(${exitDir === "left" ? "-115%" : "115%"}) scale(0.9)`,
      opacity: 0,
      zIndex: DECK_DEPTH - depth,
      transition,
      position: "absolute",
      inset: 0,
    }
  }

  // New top card starting position (will animate to idle position)
  if (phase === "entering" && depth === 0) {
    return {
      transform: `translateY(10px) scale(0.97)`,
      opacity: 0,
      zIndex: DECK_DEPTH,
      transition: "none",
      position: "absolute",
      inset: 0,
    }
  }

  const effectiveDepth =
    (phase === "exiting" || phase === "entering") && depth > 0 ? depth - 1 : depth
  const offsetPx = effectiveDepth * LAYER_OFFSET
  const scale = 1 - effectiveDepth * LAYER_SCALE
  const opacity = depth === 0 ? 1 : 1 - effectiveDepth * 0.18

  return {
    transform: `translateY(${offsetPx}px) translateX(${offsetPx}px) scale(${scale})`,
    opacity,
    zIndex: DECK_DEPTH - depth,
    transition,
    position: "absolute",
    inset: 0,
  }
}

export function TrendingHomes() {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const [exitDir, setExitDir] = useState<"left" | "right">("left")

  const total = buyProperties.length
  if (total === 0) return null

  const navigate = (dir: "left" | "right") => {
    if (phase !== "idle" || total <= 1) return
    setExitDir(dir)
    setPhase("exiting")

    setTimeout(() => {
      // 1. Snap index + freeze transitions
      setCurrent((prev) =>
        dir === "left" ? (prev + 1) % total : (prev - 1 + total) % total
      )
      setPhase("resetting")

      // 2. Put new top card in its start position (slightly below, transparent)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setPhase("entering")
          // 3. One more frame: enable transitions so card glides into place
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setPhase("idle"))
          )
        })
      )
    }, TRANSITION_MS + 20)
  }

  const layers = Array.from({ length: DECK_DEPTH }, (_, depth) => ({
    depth,
    property: buyProperties[(current + depth) % total],
    isReal: depth < total,
  }))

  const topProp = buyProperties[current]

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Trending Properties
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Our latest listings in {topProp.city}
            </p>
          </div>

          {total > 1 && (
            <div className="flex items-center gap-2">
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
            </div>
          )}
        </div>

        {/*
          Deck container — fixed height + enough padding-bottom for peeking layers.
          overflow-visible lets the shifted cards peek out below.
        */}
        <div
          className="relative overflow-visible"
          style={{ height: `calc(300px + ${(DECK_DEPTH - 1) * LAYER_OFFSET}px)` }}
        >
          {/* Render deepest first so top card paints on top */}
          {[...layers].reverse().map(({ depth, property: prop, isReal }) => (
            <div key={`layer-${depth}`} style={cardStyle(depth, phase, exitDir)}>
              {isReal ? (
                /* ── Real horizontal property card ── */
                <div className="flex h-full w-full rounded-xl border border-border shadow-md bg-card overflow-hidden">
                  {/* Image — left 45% */}
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

                  {/* Details — right */}
                  <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-xl font-bold text-primary mb-1 truncate">
                        {prop.price}
                      </p>
                      <p className="text-sm font-semibold text-foreground truncate">
                        {prop.address}
                      </p>
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
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
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
              ) : (
                /* ── Placeholder skeleton ── */
                <PlaceholderCard />
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          More listings being added soon — check back often.
        </p>
      </div>
    </section>
  )
}
