// Renders the app to static HTML at build time and injects it into
// dist/index.html, so crawlers and AI agents that do not execute JavaScript
// still see the full bio. The client hydrates that markup (see src/main.tsx).
//
// Also writes dist/404.html. (The sitemap is emitted by the agent-routes
// plugin in vite.config.ts, which serves it in dev too.)
import { readFileSync, writeFileSync } from "fs"
import { pathToFileURL } from "url"

const HTML = "dist/index.html"
const ENTRY = "dist-ssr/entry-server.js"

const { render, renderNotFound } = await import(pathToFileURL(ENTRY).href)
const app = render()

const html = readFileSync(HTML, "utf8")
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error(`[prerender] could not find ${marker} in ${HTML}`)
}

writeFileSync(HTML, html.replace(marker, `<div id="root">${app}</div>`))

// The 404 page is the same components and the same stylesheet, but ships no
// JavaScript: Vercel serves dist/404.html for unknown paths with a real 404
// status, and nothing on it needs to hydrate.
const stylesheet = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!stylesheet) {
  throw new Error(`[prerender] could not find the stylesheet link in ${HTML}`)
}

writeFileSync(
  "dist/404.html",
  `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/jpeg" href="/avatar.jpg" />
    <link rel="apple-touch-icon" href="/avatar.jpg" />
    <title>404 · Kacem Mathlouthi</title>
    <meta
      name="description"
      content="No page exists at this address. Head back to kacemmathlouthi.dev."
    />
    <link rel="stylesheet" crossorigin href="${stylesheet[1]}" />
  </head>
  <body>
    <div id="root">${renderNotFound()}</div>
  </body>
</html>
`
)

const text = app
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim()
console.log(
  `[prerender] injected ${app.length} chars of markup ` +
    `(${text.length} chars of text) into ${HTML}`
)
