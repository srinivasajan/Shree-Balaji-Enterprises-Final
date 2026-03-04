"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Star, MapPin, Phone, Mail, Award, Home, Clock,
  Check, ChevronRight, MessageSquare
} from "lucide-react"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { agents, buyProperties } from "@/lib/data"

const reviews = [
  { name: "Rajesh K.", rating: 5, date: "2 weeks ago", text: "Absolutely wonderful to work with! Very professional and responsive. Made the entire home-buying process in Ambernath smooth and stress-free." },
  { name: "Priya S.", rating: 5, date: "1 month ago", text: "Incredible knowledge of the local MMR market. Helped us find exactly what we were looking for within our budget in Badlapur. Highly recommend!" },
  { name: "Amit M.", rating: 5, date: "2 months ago", text: "Great communication throughout the process. Always available to answer questions and provided valuable insights on Ulhasnagar properties." },
]

export default function AgentDetailPage() {
  const params = useParams()
  const agent = agents.find((a) => a.id === Number(params.id))
  const [messageSent, setMessageSent] = useState(false)

  if (!agent) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-32">
          <h1 className="text-2xl font-bold text-foreground mb-2">Agent Not Found</h1>
          <p className="text-muted-foreground mb-6">This agent profile is no longer available.</p>
          <Link href="/agents"><Button>Find an Agent</Button></Link>
        </div>
        <Footer />
      </>
    )
  }

  const agentListings = buyProperties.filter((p) => p.listingAgent?.id === agent.id)

  return (
    <>
      <main className="mx-auto max-w-[1280px] px-4 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/agents" className="hover:text-primary transition-colors">Agents</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{agent.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 pb-12">
          {/* Left column - Agent info */}
          <div className="flex-1 min-w-0">
            {/* Agent header */}
            <div className="flex items-start gap-5 mb-8">
              <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-2xl overflow-hidden shrink-0">
                <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="144px" priority />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{agent.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">{agent.company}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-foreground">{agent.rating}</span>
                    <span className="text-xs text-muted-foreground">({agent.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-sm text-foreground">
                    <Home className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{agent.salesCount}</span> homes sold
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-foreground">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{agent.yearsExperience}</span> years experience
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {agent.areas[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <a href={`tel:${agent.phone}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Phone className="h-3.5 w-3.5 mr-1.5" />
                      {agent.phone}
                    </Button>
                  </a>
                  <a href={`mailto:${agent.email}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Mail className="h-3.5 w-3.5 mr-1.5" />
                      Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-3">About {agent.name.split(" ")[0]}</h2>
              <p className="text-sm text-foreground leading-relaxed">{agent.bio}</p>
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {agent.specialties.map((s) => (
                  <span key={s} className="px-3 py-1.5 text-sm font-medium bg-primary/5 text-primary rounded-full border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Service areas */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Service Areas</h2>
              <div className="flex flex-wrap gap-3">
                {agent.areas.map((area) => (
                  <div key={area} className="flex items-center gap-2 px-4 py-3 bg-muted/30 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-card border border-border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{agent.salesCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Sales</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{agent.rating}</p>
                  <p className="text-xs text-muted-foreground mt-1">Avg Rating</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{agent.reviewCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">Reviews</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{agent.yearsExperience}</p>
                  <p className="text-xs text-muted-foreground mt-1">Years Active</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Client Reviews</h2>
              <div className="flex flex-col gap-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="p-5 border border-border rounded-lg bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm font-semibold text-primary hover:underline">
                View all {agent.reviewCount} reviews
              </button>
            </div>

            {/* Agent listings */}
            {agentListings.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  {"Listings by"} {agent.name.split(" ")[0]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agentListings.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Contact form */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-[80px]">
              <div className="border border-border rounded-xl p-5 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
                    <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Contact {agent.name.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground">Typically responds within 1 hour</p>
                  </div>
                </div>

                {messageSent ? (
                  <div className="text-center py-8">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mx-auto mb-3">
                      <Check className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-base font-bold text-foreground">Message Sent!</p>
                    <p className="text-sm text-muted-foreground mt-1">{agent.name.split(" ")[0]} will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setMessageSent(true) }} className="flex flex-col gap-2.5">
                    <input type="text" placeholder="Your name" className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                    <input type="email" placeholder="Email address" className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                    <input type="tel" placeholder="Phone number" className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">{"I'm looking to..."}</option>
                      <option>Buy a home</option>
                      <option>Sell my home</option>
                      <option>Buy & sell</option>
                      <option>Rent</option>
                      <option>Other</option>
                    </select>
                    <textarea placeholder="Tell the agent about what you're looking for..." rows={4} className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                    <Button type="submit" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                    <Phone className="h-3.5 w-3.5" />{agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                    <Mail className="h-3.5 w-3.5" />{agent.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
