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

// Production ships prerendered markup in #root, so hydrate it. The dev server
// serves an empty shell, which falls back to a client render.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
