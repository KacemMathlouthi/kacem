import type { ComponentType } from "react"
import { pageview } from "@vercel/analytics"
import { FileText } from "lucide-react"

import AbhinavBentoButton from "@/components/pixel-perfect/abhinav-bento-button"
import { GithubIcon } from "@/components/icons/github-icon"
import { LinkedinIcon } from "@/components/icons/linkedin-icon"
import { XIcon } from "@/components/icons/x-icon"

import { CopyEmailButton } from "./copy-email-button"

type Social = {
  label: string
  href: string
  Icon: ComponentType<{ className?: string }>
  /** Logged as a Vercel Analytics page view on click, so it counts on the free plan. */
  view?: string
}

const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/KacemMathlouthi",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kacem-mathlouthi/",
    Icon: LinkedinIcon,
  },
  {
    label: "X",
    href: "https://x.com/KacemMathlouthi",
    Icon: XIcon,
  },
  {
    label: "Résumé",
    href: "/kacem-mathlouthi-resume.pdf",
    Icon: FileText,
    view: "/resume",
  },
]

/** Row of profile links styled as glossy bento buttons, plus a copy-email action. */
export function SocialLinks() {
  return (
    <nav
      aria-label="Social profiles"
      className="mt-3 flex items-center justify-center gap-2.5"
    >
      {socials.map(({ label, href, Icon, view }) => (
        <AbhinavBentoButton
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target="_blank"
          rel="noopener noreferrer"
          onClick={
            view ? () => pageview({ route: view, path: view }) : undefined
          }
          className="grid size-10 place-items-center p-0"
        >
          <Icon className="size-[1.15rem] text-foreground" />
        </AbhinavBentoButton>
      ))}
      <CopyEmailButton />
    </nav>
  )
}
