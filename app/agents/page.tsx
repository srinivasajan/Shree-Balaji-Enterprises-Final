"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search, Star, MapPin, Phone, Mail, ChevronDown,
  Award, Home, TrendingUp, Users, MessageSquare
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { agents } from "@/lib/data"

function AgentCard({ agent }: { agent: typeof agents[0] }) {
  return (
    <div className="border border-border rounded-xl bg-card hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0">
            <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="80px" />
          </div>
          <div className="min-w-0 flex-1">
            <Link href={`/agents/${agent.id}`} className="text-base font-bold text-foreground hover:text-primary transition-colors">
              {agent.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">{agent.company}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-foreground">{agent.rating}</span>
              <span className="text-xs text-muted-foreground">({agent.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Home className="h-3 w-3" />
                {agent.salesCount} sales
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {agent.yearsExperience} yrs
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{agent.bio}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {agent.specialties.map((s) => (
            <span key={s} className="px-2 py-0.5 text-[10px] font-semibold bg-primary/5 text-primary rounded-full">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          {agent.areas.join(", ")}
        </div>
      </div>

      <div className="border-t border-border px-5 py-3 flex items-center gap-2">
        <Link href={`/agents/${agent.id}`} className="flex-1">
          <Button size="sm" className="w-full text-xs">Contact Agent</Button>
        </Link>
        <a href={`tel:${agent.phone}`}>
          <Button size="sm" variant="outline" className="text-xs">
            <Phone className="h-3.5 w-3.5" />
          </Button>
        </a>
        <a href={`mailto:${agent.email}`}>
          <Button size="sm" variant="outline" className="text-xs">
            <Mail className="h-3.5 w-3.5" />
          </Button>
        </a>
      </div>
    </div>
  )
}

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Top Rated", "Most Sales", "Buyers", "Sellers"]

  return (
    <>

      {/* Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:py-16">
          <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-2 text-balance">
            Meet Our Real Estate Expert
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/80 mb-8 max-w-lg">
            Anju Jangiti – Founder &amp; Director of Shree Balaji Enterprises. RERA registered agent with 15+ years of experience in Mumbai Metropolitan Region.
          </p>

          <div className="flex items-center gap-3 max-w-2xl">
            <div className="flex-1 flex items-center bg-card rounded-lg px-3">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or area"
                className="w-full px-3 py-3 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <Button variant="secondary" className="px-6 py-3 h-auto font-semibold">
              Search
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-8 mt-8">
            <div>
              <p className="text-2xl font-bold text-primary-foreground">15+</p>
              <p className="text-xs text-primary-foreground/70">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-foreground">500+</p>
              <p className="text-xs text-primary-foreground/70">Properties Sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-foreground">1000+</p>
              <p className="text-xs text-primary-foreground/70">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-card border-b border-border sticky top-[60px] z-40">
        <div className="mx-auto max-w-[1280px] px-4 py-3 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors shrink-0 ${
                activeFilter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="flex-1" />
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground shrink-0">
            Sort: Rating <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Agent Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-[1280px] px-4">
          <p className="text-sm text-muted-foreground mb-6">
            <span className="font-bold text-foreground">{agents.length}</span> agents found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-[1280px] px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Why Work with Our Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">Local Market Experts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Our agents know every neighborhood, school district, and market trend in your area.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">Verified Reviews</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Read real reviews from past clients to find the perfect agent for your needs.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">Direct Communication</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Contact agents directly by phone, email, or message. No middlemen, no delays.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
