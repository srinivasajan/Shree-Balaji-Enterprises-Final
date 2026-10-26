"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import { NavigationDock } from "@/components/core/navigation-dock"

const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "Home Loans", href: "/home-loans" },
  { label: "Locations", href: "/locations" },
  { label: "About Us", href: "/about" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between h-[60px]">
        {/* Left: Brand Logo */}
        <div className="flex-1 flex items-center justify-start min-w-0">
          <Link href="/" className="flex items-center gap-0.5 shrink-0" aria-label="Shree Balaji Enterprises">
            <BrandLogo className="h-9 w-auto aspect-[820/528] -ml-1.5" priority />
            <span className="text-[19px] sm:text-[20px] font-bold text-foreground leading-none tracking-tight whitespace-nowrap">
              <span className="text-amber-500">Shree</span> <span className="text-primary">Balaji</span> Enterprises
            </span>
          </Link>
        </div>

        {/* Center: Premium Navigation Dock (Desktop) */}
        <div className="hidden lg:flex items-center justify-center shrink-0 mx-2">
          <NavigationDock items={navLinks} />
        </div>

        {/* Right side: Contact Us button & Mobile menu */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <Link href="/contact" className="hidden lg:inline-flex">
            <Button size="sm" className="text-sm font-semibold rounded-full px-4.5 shadow-xs">
              Contact Us
            </Button>
          </Link>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden border-t border-border bg-card overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-3 text-sm font-semibold rounded-md ${
                    pathname.startsWith(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              <Link href="/contact" className="px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted rounded-md" onClick={() => setMobileOpen(false)}>
                Enquiry
              </Link>
              <Link href="/contact" className="px-3 py-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-md" onClick={() => setMobileOpen(false)}>
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
