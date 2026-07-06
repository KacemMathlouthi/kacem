import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import type { BrandStyle } from "@/lib/brands"

type BrandProps = BrandStyle & {
  /** Render the logo larger (for marks that read small at 1em). */
  big?: boolean
  children: ReactNode
}

/** An entity name preceded by its inline logo and shown in its brand accent. */
export function Brand({ logo, color, big, children }: BrandProps) {
  return (
    <span className="font-medium" style={{ color }}>
      {logo && (
        <img
          src={logo}
          alt=""
          aria-hidden
          className={cn(
            "mr-1.5 inline-block w-auto -translate-y-px align-middle",
            big ? "h-[1.35em]" : "h-[1.05em]"
          )}
        />
      )}
      {children}
    </span>
  )
}
