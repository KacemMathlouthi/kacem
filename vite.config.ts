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

/**
 * Owns /sitemap.xml: emitted into the bundle at build time, and served live by
 * the dev server so the two behave the same.
 */
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
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), agentRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
