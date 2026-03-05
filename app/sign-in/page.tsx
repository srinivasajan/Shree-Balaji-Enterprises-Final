"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, User, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [time, setTime] = useState("")
  const [interest, setInterest] = useState("Buy")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    const msg = encodeURIComponent(`Hi, I would like to request a callback.\nName: ${name}\nPhone: ${phone}\nBest time to call: ${time || "Anytime"}\nInterested in: ${interest}`)
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
                <h2 className="text-lg font-bold text-foreground mb-2">WhatsApp Opened!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Your details have been pre-filled in WhatsApp. Just send the message and our team will call you back within a few hours.
                </p>
                <Link href="/">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground text-center mb-1">Request a Callback</h1>
                <p className="text-sm text-muted-foreground text-center mb-8">Share your details and we will call you back</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="cb-name" className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="cb-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cb-phone" className="block text-sm font-semibold text-foreground mb-1.5">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="cb-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your mobile number"
                        required
                        className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cb-time" className="block text-sm font-semibold text-foreground mb-1.5">Best Time to Call</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select
                        id="cb-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                      >
                        <option value="">Any time</option>
                        <option>Morning (9AM – 12PM)</option>
                        <option>Afternoon (12PM – 4PM)</option>
                        <option>Evening (4PM – 7PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">I am interested in</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Buy", "Sell", "Rent"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInterest(opt)}
                          className={`py-2.5 text-sm font-semibold rounded-md border transition-colors ${interest === opt ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full py-3 h-auto text-sm font-semibold mt-2">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Request Callback via WhatsApp
                  </Button>
                </form>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Want to register your property requirements?{" "}
            <Link href="/sign-up" className="font-semibold text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
