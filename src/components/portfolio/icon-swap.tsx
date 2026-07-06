import type { ReactNode } from "react"

/**
 * Crossfades (blur + scale) between two stacked icons based on `state`.
 * Styles live under `.t-icon-swap` in index.css. Adapted from Transitions.dev.
 */
export function IconSwap({
  state,
  iconA,
  iconB,
}: {
  state: "a" | "b"
  iconA: ReactNode
  iconB: ReactNode
}) {
  return (
    <span className="t-icon-swap" data-state={state}>
      <span className="t-icon" data-icon="a">
        {iconA}
      </span>
      <span className="t-icon" data-icon="b">
        {iconB}
      </span>
    </span>
  )
}
