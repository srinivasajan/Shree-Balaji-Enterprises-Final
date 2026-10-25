import React from "react"
import Image from "next/image"

export function BrandLogo({
  className = "h-9 w-auto aspect-[820/528]",
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Shree Balaji Enterprises Logo"
        width={820}
        height={528}
        priority={priority}
        className="h-full w-auto object-contain"
      />
    </div>
  )
}
