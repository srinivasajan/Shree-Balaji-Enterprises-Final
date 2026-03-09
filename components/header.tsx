"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <div className="w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between h-[60px] md:h-[56px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Shree Balaji Enterprises">
          <Image
            src="https://raw.githubusercontent.com/srinivasajan/shreebalajienterprises/main/images/logo.png"
            alt="Shree Balaji Enterprises Logo"
            width={52}
            height={52}
            className="h-[48px] w-[48px] object-contain"
          />
          <span className="text-base sm:text-xl font-bold text-foreground leading-tight whitespace-nowrap">
            <span className="text-amber-500">Shree</span> <span className="text-primary">Balaji</span> Enterprises
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/contact">
            <Button size="sm" className="text-sm font-semibold">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card">
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
        </div>
      )}
    </header>
  )
}
