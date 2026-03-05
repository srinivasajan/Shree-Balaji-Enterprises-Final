import Image from "next/image"
import Link from "next/link"
import {
  Shield, Users, TrendingUp, MapPin, Phone, Mail,
  Award, CheckCircle2, Building2, Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Properties Sold" },
  { value: "1000+", label: "Happy Clients" },
  { value: "13+", label: "Cities Covered" },
]

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description: "We believe every transaction must be transparent. No hidden charges, no false promises — just honest guidance.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your dream matters to us. We listen, understand your budget, and work tirelessly until you find the right property.",
  },
  {
    icon: Award,
    title: "RERA Compliant",
    description: "Fully registered under RERA (Reg No: A51700023633), ensuring every deal follows the law and protects your rights.",
  },
  {
    icon: Building2,
    title: "End-to-End Support",
    description: "From property search and site visits to loan assistance and registration — we handle it all under one roof.",
  },
]

const services = [
  "Residential Properties (Flats, Bungalows, Row Houses)",
  "Commercial Properties (Shops, Offices, Showrooms)",
  "Industrial Properties (Warehouses, Godowns, Sheds)",
  "Plots & Land (Residential & Commercial)",
  "Home Loan Assistance",
  "Legal Documentation Support",
  "Property Valuation",
  "Site Visits & Advisory",
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://raw.githubusercontent.com/srinivasajan/shreebalajienterprises/main/images/locations/ambernath.jpg"
            alt="Ambernath city view"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/65" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-20 md:py-28 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-3xl md:text-5xl font-bold text-card leading-tight mb-4 text-balance">
            15+ Years of Trusted Real Estate
          </h1>
          <p className="text-base md:text-lg text-card/80 max-w-2xl mx-auto mb-8">
            Shree Balaji Enterprises is a RERA-registered real estate agency based in Ambernath, serving
            families and businesses across the Mumbai Metropolitan Region since 2010.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/contact">
              <Button size="lg">Get in Touch</Button>
            </Link>
            <Link href="/buy">
              <Button size="lg" variant="outline" className="border-card text-card hover:bg-card/10">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-10">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 text-balance">
                Built on Trust, Driven by Results
              </h2>
              <div className="flex flex-col gap-4 text-sm text-foreground leading-relaxed">
                <p>
                  Shree Balaji Enterprises was founded with a single mission: to make real estate simple,
                  transparent, and accessible for everyone. What started as a small office in Ambernath-West
                  has grown into one of the most trusted real estate agencies across the Mumbai Metropolitan Region.
                </p>
                <p>
                  Over the last 15+ years, we have helped more than 1,000 families buy, sell, and rent
                  properties — from modest 1BHK flats to large commercial warehouses. Our deep roots in
                  the local communities of Ambernath, Badlapur, Ulhasnagar, Thane, and beyond give us an
                  edge that no national portal can replicate.
                </p>
                <p>
                  We are fully registered under RERA (Reg No: A51700023633), and every transaction we handle
                  follows the highest standards of legal compliance and ethical practice. With Shree Balaji
                  Enterprises, you don&apos;t just find a property — you find a partner for life.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <a href="tel:7767805544">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </Button>
                </a>
                <a href="https://wa.me/917767805544" target="_blank" rel="noopener noreferrer">
                  <Button>
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Founder card */}
            <div className="w-full lg:w-[360px] shrink-0">
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 text-primary text-3xl font-bold mx-auto mb-4">
                  A
                </div>
                <h3 className="text-xl font-bold text-foreground">Anju Jangiti</h3>
                <p className="text-sm text-primary font-semibold mt-1">Founder & Director</p>
                <div className="border-t border-border my-4" />
                <p className="text-sm text-muted-foreground leading-relaxed text-left">
                  With over 15 years of experience in real estate, Anju has built Shree Balaji Enterprises
                  on the foundation of trust and client satisfaction. Her in-depth knowledge of the MMR
                  market and hands-on approach to every deal has earned her the confidence of hundreds of
                  families and businesses alike.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href="tel:7767805544" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4 shrink-0" /> 7767805544
                  </a>
                  <a href="mailto:anjujangiti@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4 shrink-0" /> anjujangiti@gmail.com
                  </a>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West, 421505</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-muted/50">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">What We Do</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">
                Complete Real Estate Solutions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((service) => (
                  <div key={service} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[380px] shrink-0 bg-primary rounded-2xl p-8 text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Reach Out Today</h3>
              <p className="text-sm text-primary-foreground/80 mb-6 leading-relaxed">
                Looking to buy, sell, or rent a property? Our team is available 6 days a week to guide you.
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 shrink-0" /> 7767805544 / 9168588575
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 shrink-0" /> shreebalajienterprisesamb@gmail.com
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West 421505
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a href="https://wa.me/917767805544" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center text-sm font-semibold bg-white text-primary rounded-lg hover:bg-white/90 transition-colors">
                  WhatsApp Us
                </a>
                <Link href="/contact" className="block w-full py-3 text-center text-sm font-semibold border border-primary-foreground/30 text-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors">
                  Send Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
