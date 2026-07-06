import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import type { BrandStyle } from "@/lib/brands"

type BrandProps = BrandStyle & {
  /** Render the logo larger (for marks that read small at 1em). */
  big?: boolean
  children: ReactNode
}

/**
 * An entity name preceded by its inline logo and shown in its brand accent.
 * When `href` is set the name becomes a link.
 */
export function Brand({ logo, color, href, big, children }: BrandProps) {
  const inner = (
    <>
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
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline-offset-2 hover:underline"
        style={{ color }}
      >
        {inner}
      </a>
    )
  }

  return (
    <span className="font-medium" style={{ color }}>
      {inner}
    </span>
  )
}
