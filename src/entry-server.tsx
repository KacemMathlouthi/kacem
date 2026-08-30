import { renderToString } from "react-dom/server"

import App from "./App"
import { NotFound } from "./components/portfolio/not-found"

// Build-time entry for scripts/prerender.mjs. The app is fully static, so this
// markup matches what the client renders on hydration.
export function render() {
  return renderToString(<App />)
}

/** Same, for the standalone 404 page. */
export function renderNotFound() {
  return renderToString(<NotFound />)
}
