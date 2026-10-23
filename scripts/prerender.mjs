// Renders the app into dist/index.html (and dist/404.html) at build time so
// crawlers that skip JavaScript still see the bio. The client hydrates it.
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

// Same components and stylesheet, but no JavaScript: nothing here hydrates.
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
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#000000" />
    <meta name="color-scheme" content="dark" />
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
