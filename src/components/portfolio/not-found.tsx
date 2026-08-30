import { ArrowLeft, FileText } from "lucide-react"

import AbhinavBentoButton from "@/components/pixel-perfect/abhinav-bento-button"
import Intersection2 from "@/components/pixel-perfect/intersection2"
import { GithubIcon } from "@/components/icons/github-icon"

/** Lines shown verbatim in the agent block: real markdown, real links. */
const AGENT_MARKDOWN = [
  "# 404, Not Found",
  "",
  "No page exists at this path. This site is a single page.",
  "",
  "- [Homepage](https://kacemmathlouthi.dev/): full profile",
  "- [Profile as markdown](https://kacemmathlouthi.dev/index.md): canonical machine-readable version",
  "- [Agent instructions](https://kacemmathlouthi.dev/llms.txt): what this site covers, and when to use it",
  "- [Sitemap](https://kacemmathlouthi.dev/sitemap.xml): every indexable URL",
  "",
  "Contact: kacem.mathlouthi@insat.ucar.tn",
].join("\n")

// Prerendered to dist/404.html at build time and served with a real 404
// status. Ships no JavaScript, so it must work as static markup.
export function NotFound() {
  return (
    <main className="w-full">
      <Intersection2 className="max-w-xl">
        <div className="reveal flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-8">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              404
            </span>
            <h1 className="text-[1.55rem] font-semibold tracking-tight sm:text-[1.8rem]">
              This page doesn&apos;t exist
            </h1>
          </div>

          <p className="text-[0.98rem] leading-[1.58rem] text-muted-foreground">
            Nothing lives at this address.
          </p>

          {/* cataas.com returns a different cat per request, so the page
              stays random with no JavaScript. No frame, no crop. */}
          <figure className="flex w-full max-w-lg flex-col items-center">
            <img
              src="https://cataas.com/cat?width=900"
              alt="A random cat"
              decoding="async"
              className="max-h-128 w-auto max-w-full rounded-xl"
            />
            <figcaption className="mt-2.5 text-xs text-muted-foreground">
              Page not found. Cat found.
            </figcaption>
          </figure>

          <nav
            aria-label="Recovery links"
            className="mt-1 flex flex-wrap items-center justify-center gap-2.5"
          >
            <AbhinavBentoButton
              href="/"
              className="inline-flex aspect-auto items-center gap-2 px-4 py-2 text-[0.8rem] font-medium text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Back home
            </AbhinavBentoButton>
            <AbhinavBentoButton
              href="/kacem-mathlouthi-resume.pdf"
              className="inline-flex aspect-auto items-center gap-2 px-4 py-2 text-[0.8rem] font-medium text-foreground"
            >
              <FileText className="size-3.5" />
              Résumé
            </AbhinavBentoButton>
            <AbhinavBentoButton
              href="https://github.com/KacemMathlouthi"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center p-0"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon className="size-[1.15rem] text-foreground" />
            </AbhinavBentoButton>
          </nav>

          {/* Recovery instructions for agents on a dead link. `hidden` keeps
              it out of view but real in the markup. */}
          <div hidden>
            <pre>{AGENT_MARKDOWN}</pre>
          </div>
        </div>
      </Intersection2>
    </main>
  )
}

export default NotFound
