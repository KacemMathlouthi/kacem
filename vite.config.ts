import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

const SITE = "https://kacemmathlouthi.dev"

/** The sitemap is tiny and fully derived, so it is generated, never committed. */
function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10)
  const url = (loc: string, priority: string) =>
    `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url("/", "1.0")}
${url("/index.md", "0.8")}
${url("/kacem-mathlouthi-resume.pdf", "0.5")}
</urlset>
`
}

const NOT_FOUND_SHELL = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>404 · Kacem Mathlouthi</title>
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/jpeg" href="/avatar.jpg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entry-404.tsx"></script>
  </body>
</html>
`

// Gives the dev server what production does: /sitemap.xml, and unknown paths
// answered with the real 404 page and a real 404 status.
function agentRoutes(): Plugin {
  let isSsrBuild = false

  return {
    name: "agent-routes",

    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },

    // Emitted with the client bundle only; the SSR pass writes to dist-ssr.
    generateBundle() {
      if (isSsrBuild) return
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap(),
      })
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split("?")[0] !== "/sitemap.xml") return next()
        res.setHeader("Content-Type", "application/xml; charset=utf-8")
        res.end(buildSitemap())
      })

      // Runs ahead of Vite's index-html middleware, so it must pass the real
      // page through itself. The site is one page.
      const PAGES = new Set(["/", "/index.html"])

      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.headers.accept?.includes("text/html")) return next()
          const pathname = (req.url ?? "/").split("?")[0]
          if (PAGES.has(pathname)) return next()
          // A missing file with an extension is a missing file: 404 it
          // plainly rather than handing back a page.
          if (/\.[^/]+$/.test(pathname) && !pathname.endsWith(".html")) {
            res.statusCode = 404
            res.setHeader("Content-Type", "text/plain; charset=utf-8")
            res.end("404 Not Found\n")
            return
          }
          try {
            const html = await server.transformIndexHtml(
              req.url ?? "/",
              NOT_FOUND_SHELL
            )
            res.statusCode = 404
            res.setHeader("Content-Type", "text/html; charset=utf-8")
            res.end(html)
          } catch (err) {
            next(err)
          }
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Without this, Vite rewrites every unknown path to index.html with a 200.
  appType: "mpa",
  plugins: [react(), tailwindcss(), agentRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
