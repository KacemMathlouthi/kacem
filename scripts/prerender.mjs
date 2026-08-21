// Renders the app to static HTML at build time and injects it into
// dist/index.html, so crawlers and AI agents that do not execute JavaScript
// still see the full bio. The client hydrates that markup (see src/main.tsx).
//
// Also emits dist/sitemap.xml with a fresh lastmod, since the site is a single
// page and the only thing that changes per deploy is the date.
import { readFileSync, writeFileSync } from "fs"
import { pathToFileURL } from "url"

const SITE = "https://kacemmathlouthi.dev"
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

const lastmod = new Date().toISOString().slice(0, 10)
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE}/index.md</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE}/kacem-mathlouthi-resume.pdf</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`
)

const text = app.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
console.log(
  `[prerender] injected ${app.length} chars of markup ` +
    `(${text.length} chars of text) into ${HTML}`
)
