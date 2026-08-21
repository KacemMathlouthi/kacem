import { renderToString } from "react-dom/server"

import App from "./App"

/**
 * Server entry used only at build time by `scripts/prerender.mjs`.
 *
 * The app is fully static (no data fetching, no dates, no randomness), so the
 * markup rendered here matches what the client renders on hydration.
 */
export function render() {
  return renderToString(<App />)
}
