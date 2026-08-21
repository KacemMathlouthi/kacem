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

/**
 * The 404 page, prerendered to `dist/404.html` at build time (see
 * scripts/prerender.mjs) and served by Vercel with a real 404 status. It ships
 * no JavaScript, so everything here has to work as static markup.
 */
export function NotFound() {
  return (
    <main className="w-full">
      <Intersection2>
        <div className="reveal flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-8">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              404
            </span>
            <h1 className="text-[1.55rem] font-semibold tracking-tight sm:text-[1.8rem]">
              This page doesn&apos;t exist
            </h1>
          </div>

          <p className="max-w-prose text-[0.98rem] leading-[1.58rem] text-muted-foreground">
            Nothing lives at this address. The site is a single page, so the
            bio, the projects, the paper, and the links are all one click away
            on the home page.
          </p>

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

          {/*
            Recovery instructions for agents that follow a dead link. Never
            shown to people, but `hidden` keeps it as real text in the markup,
            so anything reading the HTML still finds it.
          */}
          <div hidden>
            <pre>{AGENT_MARKDOWN}</pre>
          </div>
        </div>
      </Intersection2>
    </main>
  )
}

export default NotFound
