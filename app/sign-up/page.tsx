"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)

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
            <h1 className="text-2xl font-bold text-foreground text-center mb-1">Create Your Account</h1>
            <p className="text-sm text-muted-foreground text-center mb-8">Start your property journey with us</p>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-1.5">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-4 pr-10 py-3 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Password requirements */}
                {password.length > 0 && (
                  <div className="flex flex-col gap-1 mt-2">
                    {[
                      { met: hasMinLength, label: "At least 8 characters" },
                      { met: hasUppercase, label: "One uppercase letter" },
                      { met: hasNumber, label: "One number" },
                    ].map((req) => (
                      <div key={req.label} className="flex items-center gap-1.5">
                        <Check className={`h-3.5 w-3.5 ${req.met ? "text-green-600" : "text-muted-foreground"}`} />
                        <span className={`text-xs ${req.met ? "text-green-600" : "text-muted-foreground"}`}>{req.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary mt-0.5" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">Terms of Use</Link>
                  {" "}and{" "}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <Button type="submit" className="w-full py-3 h-auto text-sm font-semibold">
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social sign-up */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.02-.36-.02-.55 0-1.12.544-2.34 1.205-3.08.66-.73 1.904-1.37 2.927-1.45.06.16.08.33.08.49zM22.038 17.32c-.068.15-.49 1.11-1.13 2.16-.586.97-1.193 1.93-2.152 1.95-1.01.02-1.32-.6-2.465-.6s-1.527.58-2.48.62c-.94.04-1.653-1.04-2.25-2-.58-.93-1.037-2.41-1.037-3.82 0-2.25 1.533-3.44 3.04-3.47.95-.02 1.85.61 2.44.61.59 0 1.69-.76 2.85-.65.49.02 1.85.19 2.73 1.46-.07.04-1.63.91-1.63 2.71 0 2.15 1.97 2.88 2.02 2.89z" />
                </svg>
                Continue with Apple
              </button>
            </div>
          </div>

          {/* Sign in link */}
          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
