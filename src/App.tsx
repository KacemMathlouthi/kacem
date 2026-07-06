import * as React from "react"
import { Mail } from "lucide-react"

import Intersection2 from "@/components/pixel-perfect/intersection2"
import AbhinavBentoButton from "@/components/pixel-perfect/abhinav-bento-button"

type BrandProps = {
  logo?: string
  color: string
  big?: boolean
  children: React.ReactNode
}

// Entity name: inline logo + brand-pastel colored name.
function Brand({ logo, color, big, children }: BrandProps) {
  return (
    <span className="font-medium whitespace-nowrap" style={{ color }}>
      {logo && (
        <img
          src={logo}
          alt=""
          aria-hidden
          className={`mr-1.5 inline-block w-auto -translate-y-px align-middle ${
            big ? "h-[1.35em]" : "h-[1.05em]"
          }`}
        />
      )}
      {children}
    </span>
  )
}

// Normal important term: white (theme foreground).
function Key({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>
}

// Brand icons are no longer shipped by lucide, so use inline simple-icons paths.
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const brand = {
  callab: "#f472b6", // pink pastel
  yc: "#fb651e", // Y Combinator orange
  gsoc: "#f59e0b", // amber pastel
  nrnb: "var(--foreground)", // white
  orange: "#f97316", // orange pastel
  ains: "#a78bfa", // violet pastel
  ieee: "#2f6fed", // IEEE blue
  insat: "#d16a6a", // INSAT maroon pastel
  animus: "#e7b277", // warm tan
  metis: "#eab308", // gold
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/KacemMathlouthi",
    Icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kacem-mathlouthi/",
    Icon: LinkedinIcon,
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/KacemMathl44045",
    Icon: XIcon,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:kacem.mathlouthi@insat.ucar.tn",
    Icon: Mail,
    external: false,
  },
]

export function App() {
  return (
    <main className="w-full">
      <Intersection2>
          <div className="flex flex-col gap-6 px-6 py-12 sm:px-8">
            <h1 className="text-[1.75rem] font-semibold tracking-tight sm:text-[2rem]">
              Hi, I&apos;m Kacem Mathlouthi
            </h1>

            <div className="flex flex-col gap-5 text-[1.0625rem] leading-[1.7rem] text-muted-foreground">
              <p>
                I&apos;m a <Key>software engineer</Key> at{" "}
                <Brand logo="/logos/callab.png" color={brand.callab}>
                  Callab&nbsp;AI (YC&nbsp;P26)
                </Brand>
                , which I joined before we got into{" "}
                <Brand logo="/logos/yc.svg" color={brand.yc}>
                  Y&nbsp;Combinator
                </Brand>{" "}
                as a team, and where I build an{" "}
                <Key>AI voice agents platform</Key> for{" "}
                <Key>on-prem telephony</Key>, made to work with existing PBX,
                SBC, and contact center infrastructure out of the box without
                any migration.
              </p>

              <p>
                Before that, I spent the summer as a{" "}
                <Brand logo="/logos/gsoc.svg" color={brand.gsoc}>
                  Google Summer of Code&nbsp;&apos;25
                </Brand>{" "}
                fellow at{" "}
                <Brand logo="/logos/nrnb.svg" color={brand.nrnb}>
                  NRNB
                </Brand>
                , where I built <Key>VCell-AI</Key>, an AI agent platform that
                lets <Key>computational biology researchers</Key> query,
                explore, and generate <Key>biomodels</Key> in natural language.
              </p>

              <p>
                Earlier, I was a{" "}
                <Key>machine learning engineering intern</Key> at{" "}
                <Brand logo="/logos/orange.svg" color={brand.orange}>
                  Orange
                </Brand>
                , designing an <Key>edge-optimized CNN</Key> for plant disease
                classification and an{" "}
                <Key>agentic report generation pipeline</Key>.
              </p>

              <p>
                I also served as <Key>Technical Manager</Key> for{" "}
                <Brand logo="/logos/ains.png" color={brand.ains} big>
                  AINS 3.0
                </Brand>
                , the AI National Summit by{" "}
                <Brand logo="/logos/ieee-cs.svg" color={brand.ieee}>
                  IEEE CS
                </Brand>{" "}
                INSAT, where I led a <Key>three-track hackathon</Key>, a{" "}
                <Key>data science competition</Key>, and{" "}
                <Key>four workshops</Key>.
              </p>

              <p>
                Outside of work, I build things I wish existed. Right now I&apos;m
                building{" "}
                <Brand logo="/logos/animus.svg" color={brand.animus}>
                  Animus
                </Brand>
                , a platform that produces narrated, research-grounded{" "}
                <Key>Manim explainer videos</Key> for any topic. Before that I
                built{" "}
                <Brand logo="/logos/metis.svg" color={brand.metis}>
                  Metis
                </Brand>
                , an AI platform for GitHub pull requests with a{" "}
                <Key>cloud coding agent</Key> for autonomous{" "}
                <Key>code review</Key>, background{" "}
                <Key>issue resolution</Key>, and automatic{" "}
                <Key>PR title and summary generation</Key>.
              </p>

              <p>
                On the research side, I have a paper under review at{" "}
                <Key>TMLR</Key>,{" "}
                <span className="font-medium text-foreground italic">
                  &ldquo;Revisiting Generalization Measures Beyond IID: How Image
                  Corruption and Perturbation Affect Robustness of Generalization
                  Measures&rdquo;
                </span>
, which revisits whether{" "}
                <Key>generalization measures</Key> that look reliable under{" "}
                <Key>IID evaluation</Key> still hold up when image classifiers
                face controlled <Key>corruptions and perturbations</Key>.
              </p>

              <p>
                I&apos;m currently a <Key>software engineering student</Key> at{" "}
                <Brand logo="/logos/insat-seal.png" color={brand.insat} big>
                  INSAT
                </Brand>{" "}
                in Tunis, graduating in 2027, and I like building things that
                put AI to practical use.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              {socials.map(({ label, href, Icon, external }) => (
                <AbhinavBentoButton
                  key={label}
                  aria-label={label}
                  title={label}
                  className="grid size-11 place-items-center p-0"
                  onClick={() =>
                    external
                      ? window.open(href, "_blank", "noopener,noreferrer")
                      : (window.location.href = href)
                  }
                >
                  <Icon className="size-5 text-foreground" aria-hidden />
                </AbhinavBentoButton>
              ))}
            </div>
          </div>
        </Intersection2>
    </main>
  )
}

export default App
