"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  {
    label: "Buy",
    href: "/buy",
    hasDropdown: true,
    children: [
      { label: "Homes for Sale", href: "/buy" },
      { label: "Open Houses", href: "/buy?filter=open-house" },
      { label: "New Construction", href: "/buy?filter=new" },
      { label: "Recently Sold", href: "/buy?filter=sold" },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    hasDropdown: true,
    children: [
      { label: "All Rentals", href: "/rent" },
      { label: "Apartments", href: "/rent?type=apartment" },
      { label: "Houses", href: "/rent?type=house" },
      { label: "Condos", href: "/rent?type=condo" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    hasDropdown: true,
    children: [
      { label: "Get Home Value", href: "/sell" },
      { label: "Seller's Guide", href: "/sell#guide" },
    ],
  },
  {
    label: "Home Loans",
    href: "/home-loans",
    hasDropdown: true,
    children: [
      { label: "Mortgage Overview", href: "/home-loans" },
      { label: "Mortgage Calculator", href: "/home-loans#calculator" },
      { label: "Refinance Rates", href: "/home-loans#refinance" },
      { label: "Get Pre-Approved", href: "/home-loans#pre-approved" },
    ],
  },
  { label: "Find an Agent", href: "/agents", hasDropdown: false },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="mx-auto max-w-[1280px] px-4 flex items-center justify-between h-[60px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0" aria-label="Shree Balaji Enterprises">
          <span className="text-lg font-bold text-foreground leading-tight">
            Shree <span className="text-primary">Balaji</span>
            <span className="block text-xs font-semibold text-muted-foreground tracking-wide">
              Enterprises
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown ? setOpenDropdown(link.label) : undefined}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-0.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  pathname.startsWith(link.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
              </Link>

              {/* Dropdown */}
              {link.hasDropdown && link.children && openDropdown === link.label && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-1">
          <a href="tel:7767805544">
            <Button variant="ghost" size="sm" className="text-sm font-semibold text-foreground">
              📞 7767805544
            </Button>
          </a>
          <a href="https://wa.me/917767805544" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-sm font-semibold text-foreground">
              WhatsApp
            </Button>
          </a>
          <div className="w-px h-5 bg-border mx-1" />
          <Link href="/sign-in">
            <Button variant="ghost" size="sm" className="text-sm font-semibold text-foreground">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="text-sm font-semibold">
              Join
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
                className={`flex items-center justify-between px-3 py-3 text-sm font-semibold rounded-md ${
                  pathname.startsWith(link.href)
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            <Link href="/sign-in" className="px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted rounded-md" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <Link href="/sign-up" className="px-3 py-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-md" onClick={() => setMobileOpen(false)}>
              Join
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
