"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  {
    label: "Buy",
    href: "/buy",
    hasDropdown: true,
    children: [
      { label: "Properties for Sale", href: "/buy" },
      { label: "Site Visits / Open Houses", href: "/buy?filter=open-house" },
      { label: "New Projects", href: "/buy?filter=new" },
      { label: "Sold Properties", href: "/buy?filter=sold" },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    hasDropdown: true,
    children: [
      { label: "All Rentals", href: "/rent" },
      { label: "Residential Rentals", href: "/rent?type=residential" },
      { label: "Commercial Rentals", href: "/rent?type=commercial" },
      { label: "Rental Enquiry", href: "/contact" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    hasDropdown: true,
    children: [
      { label: "Get Property Valuation", href: "/sell" },
      { label: "Seller's Guide", href: "/sell#guide" },
    ],
  },
  {
    label: "Home Loans",
    href: "/home-loans",
    hasDropdown: true,
    children: [
      { label: "Home Loan Overview", href: "/home-loans" },
      { label: "EMI Calculator", href: "/home-loans#calculator" },
      { label: "Bank Partners", href: "/home-loans#banks" },
      { label: "Apply for Loan", href: "/contact" },
    ],
  },
  { label: "Our Expert", href: "/agents", hasDropdown: false },
  { label: "About Us", href: "/about", hasDropdown: false },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="mx-auto max-w-[1280px] px-4 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Shree Balaji Enterprises">
          <Image
            src="https://raw.githubusercontent.com/srinivasajan/shreebalajienterprises/main/images/logo.png"
            alt="Shree Balaji Enterprises Logo"
            width={52}
            height={52}
            className="h-[52px] w-[52px] object-contain"
          />
          <span className="text-lg font-bold text-foreground whitespace-nowrap">
            Shree <span className="text-primary">Balaji</span> Enterprises
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown ? setOpenDropdown(link.label) : undefined}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-0.5 px-2.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
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
        <div className="hidden xl:flex items-center gap-2">
          <a href="tel:7767805544" className="text-sm font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap">
            📞 7767805544
          </a>
          <div className="w-px h-5 bg-border mx-1" />
          <Link href="/contact">
            <Button size="sm" className="text-sm font-semibold">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile/tablet menu button */}
        <button
          className="xl:hidden p-2 text-foreground"
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
            <a href="tel:7767805544" className="px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted rounded-md block" onClick={() => setMobileOpen(false)}>
              📞 7767805544
            </a>
            <Link href="/contact" className="px-3 py-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-md" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
