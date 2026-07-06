import type { ReactNode } from "react"

/** Emphasizes a key term in the bio using the theme foreground (white in dark). */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>
}
