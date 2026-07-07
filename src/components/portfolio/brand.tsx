import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import type { BrandStyle } from "@/lib/brands"

type BrandProps = BrandStyle & {
  /** Render the logo larger (for marks that read small at 1em). */
  big?: boolean
  /** Extra classes for the name (e.g. `italic`). */
  className?: string
  children: ReactNode
}

/**
 * An entity name preceded by its inline logo and shown in its brand accent.
 * When `href` is set the name becomes a link that glows on hover and swaps
 * its logo for an arrow to signal the outbound link.
 */
export function Brand({ logo, color, href, big, className, children }: BrandProps) {
  const size = big ? "h-[1.35em] w-[1.35em]" : "h-[1.05em] w-[1.05em]"

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "brand-link font-medium whitespace-nowrap underline-offset-2 hover:underline",
          className
        )}
        style={{ color }}
      >
        {logo && (
          <span className="brand-swap mr-1.5 -translate-y-px align-middle">
            <img
              src={logo}
              alt=""
              aria-hidden
              className={cn(
                "swap-logo inline-block w-auto",
                big ? "h-[1.35em]" : "h-[1.05em]"
              )}
            />
            <ArrowUpRight className={cn("swap-arrow", size)} aria-hidden />
          </span>
        )}
        {children}
      </a>
    )
  }

  return (
    <span
      className={cn("font-medium whitespace-nowrap", className)}
      style={{ color }}
    >
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
