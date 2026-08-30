import { next, rewrite } from "@vercel/edge"

// Serves the homepage as markdown to clients that ask for it. A vercel.json
// rewrite cannot: Vercel checks the filesystem first, so `/` always won.
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
