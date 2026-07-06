import type { ComponentType } from "react"
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
    href: "https://x.com/KacemMathl44045",
    Icon: XIcon,
  },
  {
    // Drop a PDF at public/cv.pdf to enable this.
    label: "Résumé",
    href: "/cv.pdf",
    Icon: FileText,
  },
]

/** Row of profile links styled as glossy bento buttons, plus a copy-email action. */
export function SocialLinks() {
  return (
    <nav
      aria-label="Social profiles"
      className="mt-4 flex items-center justify-center gap-3"
    >
      {socials.map(({ label, href, Icon }) => (
        <AbhinavBentoButton
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-11 place-items-center p-0"
        >
          <Icon className="size-5 text-foreground" />
        </AbhinavBentoButton>
      ))}
      <CopyEmailButton />
    </nav>
  )
}
