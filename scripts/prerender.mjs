// Renders the app to static HTML at build time and injects it into
// dist/index.html, so crawlers and AI agents that do not execute JavaScript
// still see the full bio. The client hydrates that markup (see src/main.tsx).
//
// The sitemap is emitted by the agent-routes plugin in vite.config.ts, which
// serves it in dev too.
import { readFileSync, writeFileSync } from "fs"
import { pathToFileURL } from "url"

const HTML = "dist/index.html"
const ENTRY = "dist-ssr/entry-server.js"

const { render } = await import(pathToFileURL(ENTRY).href)
const app = render()

const html = readFileSync(HTML, "utf8")
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error(`[prerender] could not find ${marker} in ${HTML}`)
}

writeFileSync(HTML, html.replace(marker, `<div id="root">${app}</div>`))

const text = app
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim()
console.log(
  `[prerender] injected ${app.length} chars of markup ` +
    `(${text.length} chars of text) into ${HTML}`
)
