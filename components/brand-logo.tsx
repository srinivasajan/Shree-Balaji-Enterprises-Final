import React from "react"

export function BrandLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-contain"
        aria-hidden="true"
      >
        <rect width="44" height="44" rx="10" fill="#0B132B" />
        {/* Subtle geometric architectural lattice */}
        <path
          d="M22 8L34 16V34L22 40L10 34V16L22 8Z"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />
        {/* Modern Monogram & Building spire */}
        <path
          d="M22 11L30 17V33L22 37L14 33V17L22 11Z"
          fill="url(#goldGradient)"
        />
        {/* Central pillar / letter S cut */}
        <path
          d="M22 14V34"
          stroke="#0B132B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 21C18 19.5 20 18.5 22 18.5C24 18.5 26 19.5 26 21C26 23 20 24.5 20 26.5C20 28 22 29 24 29"
          stroke="#0B132B"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="goldGradient" x1="14" y1="11" x2="30" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D061" />
            <stop offset="0.5" stopColor="#E5B942" />
            <stop offset="1" stopColor="#B38B21" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
