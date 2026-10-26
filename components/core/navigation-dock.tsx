"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

export type NavItem = {
  label: string
  href: string
}

interface NavigationDockProps {
  items: NavItem[]
  className?: string
}

function DockItem({
  item,
  mouseX,
  isActive,
  hoveredIndex,
  setHoveredIndex,
  index,
}: {
  item: NavItem
  mouseX: MotionValue<number>
  isActive: boolean
  hoveredIndex: number | null
  setHoveredIndex: (idx: number | null) => void
  index: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  // Distance calculation from cursor to center of this dock item
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - (bounds.x + bounds.width / 2)
  })

  // Smooth, subtle spring physics inspired by Motion Primitives Dock
  // Magnification is kept gentle (1 to 1.07) with a slight y-lift (-1.5px) to prevent layout shifts
  const scaleTransform = useTransform(distance, [-120, 0, 120], [1, 1.07, 1])
  const yTransform = useTransform(distance, [-120, 0, 120], [0, -1.5, 0])

  const springConfig = { mass: 0.1, stiffness: 220, damping: 16 }
  const scale = useSpring(scaleTransform, springConfig)
  const y = useSpring(yTransform, springConfig)

  return (
    <Link
      ref={ref}
      href={item.href}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onFocus={() => setHoveredIndex(index)}
      onBlur={() => setHoveredIndex(null)}
      className="relative px-3.5 py-1.5 text-sm font-semibold rounded-full outline-none select-none transition-colors"
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active route highlight pill */}
      {isActive && (
        <motion.div
          layoutId="activeDockPill"
          className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 -z-10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Hover background pill */}
      {hoveredIndex === index && !isActive && (
        <motion.div
          layoutId="hoverDockPill"
          className="absolute inset-0 rounded-full bg-black/[0.04] dark:bg-white/[0.08] -z-10"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}

      {/* Item label with subtle motion magnification */}
      <motion.span
        style={{ scale, y }}
        className={cn(
          "inline-block whitespace-nowrap transition-colors",
          isActive
            ? "text-primary font-bold"
            : "text-foreground/80 hover:text-foreground"
        )}
      >
        {item.label}
      </motion.span>
    </Link>
  )
}

export function NavigationDock({ items, className }: NavigationDockProps) {
  const pathname = usePathname()
  const mouseX = useMotionValue(Infinity)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav
      aria-label="Navigation dock"
      className="relative flex items-center justify-center"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => {
          mouseX.set(Infinity)
          setHoveredIndex(null)
        }}
        className={cn(
          "flex items-center gap-0.5 sm:gap-1 rounded-full border border-border/80 bg-white/95 dark:bg-card/95 px-2 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md",
          className
        )}
        role="menubar"
      >
        {items.map((item, index) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <DockItem
              key={item.href}
              item={item}
              mouseX={mouseX}
              isActive={isActive}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              index={index}
            />
          )
        })}
      </motion.div>
    </nav>
  )
}
