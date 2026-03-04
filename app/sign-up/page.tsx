"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, User, Mail, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [propType, setPropType] = useState("")
  const [budget, setBudget] = useState("")
  const [location, setLocation] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    const msg = encodeURIComponent(
      `Hi, I want to register my property requirement.\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProperty Type: ${propType || "Not specified"}\nBudget: ${budget || "Not specified"}\nPreferred Location: ${location}\nMessage: ${message}`
    )
    window.open(`https://wa.me/917767805544?text=${msg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <>
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" aria-label="Shree Balaji Enterprises Home" className="text-xl font-bold tracking-tight">
              <span className="text-foreground">Shree </span><span className="text-primary">Balaji</span><span className="text-foreground"> Enterprises</span>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-xl p-8">
            {submitted ? (
              <div className="text-center py-4">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mx-auto mb-4">
                  <MessageCircle className="h-7 w-7 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2">Requirement Sent!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Your requirement has been sent via WhatsApp. Our team will reach out to you with matching properties.
                </p>
                <Link href="/">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground text-center mb-1">Register Your Requirement</h1>
                <p className="text-sm text-muted-foreground text-center mb-6">Tell us what you are looking for and we will find the best match</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="su-name" className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-phone" className="block text-sm font-semibold text-foreground mb-1.5">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your mobile number" required className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-email" className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-type" className="block text-sm font-semibold text-foreground mb-1.5">Property Type</label>
                    <select id="su-type" value={propType} onChange={(e) => setPropType(e.target.value)} className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Select property type</option>
                      <option>Residential – Flat / Apartment</option>
                      <option>Residential – Bungalow / Villa</option>
                      <option>Residential Plot</option>
                      <option>Commercial Office Space</option>
                      <option>Commercial Shop</option>
                      <option>Industrial / Warehouse</option>
                      <option>Agricultural Land</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="su-budget" className="block text-sm font-semibold text-foreground mb-1.5">Budget (₹)</label>
                    <input id="su-budget" type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. 30 Lakhs – 60 Lakhs" className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>

                  <div>
                    <label htmlFor="su-loc" className="block text-sm font-semibold text-foreground mb-1.5">Preferred Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input id="su-loc" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Ambernath West, Badlapur..." className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="su-msg" className="block text-sm font-semibold text-foreground mb-1.5">Additional Requirements</label>
                    <textarea id="su-msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Number of BHK, specific amenities, timeline..." rows={3} className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" />
                  </div>

                  <Button type="submit" className="w-full py-3 h-auto text-sm font-semibold">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Requirement via WhatsApp
                  </Button>
                </form>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Just need a quick callback?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">
              Request here
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
