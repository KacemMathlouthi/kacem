import { next, rewrite } from "@vercel/edge"

/**
 * Serves the homepage as markdown to clients that ask for it
 * (acceptmarkdown.com), which a rewrite rule in vercel.json cannot do: Vercel
 * checks the filesystem before applying rewrites, so `/` always resolved to
 * index.html and the rule never ran. Middleware runs first.
 */
export const config = { matcher: "/" }

export default function middleware(request: Request) {
  const accept = request.headers.get("accept") ?? ""

  if (!accept.includes("text/markdown")) {
    return next()
  }

  return rewrite(new URL("/index.md", request.url), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept, Accept-Encoding",
    },
  })
}
