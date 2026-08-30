import type { CSSProperties } from "react"

// Shared bento surface, minus shape/padding so callers can be circle or pill.
export const bentoSurfaceClassName =
  "rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

// Glossy raised surface: soft outer halo + bright inset rim, from theme tokens.
export const bentoSurfaceStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, var(--secondary) 0%, color-mix(in srgb, var(--secondary) 55%, #000) 100%)",
  backgroundBlendMode: "plus-lighter, normal",
  boxShadow:
    "0px 24px 60px color-mix(in srgb, var(--foreground) 18%, transparent), 0px 14px 20px color-mix(in srgb, var(--foreground) 10%, transparent), 0px 6px 9px color-mix(in srgb, var(--foreground) 12%, transparent), 0px 2px 4px color-mix(in srgb, var(--foreground) 8%, transparent), inset 0px 1px 18px 2px color-mix(in srgb, var(--foreground) 55%, transparent), inset 0px 1px 4px 2px color-mix(in srgb, var(--foreground) 75%, transparent)",
}
