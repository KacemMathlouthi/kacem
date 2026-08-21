import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { NotFound } from "./components/portfolio/not-found"

// Dev-only entry: the dev server mounts this for unknown paths so the 404 page
// can be worked on with HMR. Production ships a prerendered, script-free
// dist/404.html instead (see scripts/prerender.mjs).
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotFound />
  </StrictMode>
)
