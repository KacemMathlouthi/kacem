import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"

const root = document.getElementById("root")!

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production builds ship prerendered markup inside #root (see
// scripts/prerender.mjs), so hydrate it instead of throwing it away. The dev
// server serves an empty shell, which falls back to a client render.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
