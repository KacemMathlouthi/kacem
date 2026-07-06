import type { ComponentType } from "react"
import { Mail } from "lucide-react"

import AbhinavBentoButton from "@/components/pixel-perfect/abhinav-bento-button"
import { GithubIcon } from "@/components/icons/github-icon"
import { LinkedinIcon } from "@/components/icons/linkedin-icon"
import { XIcon } from "@/components/icons/x-icon"

type Social = {
  label: string
  href: string
  Icon: ComponentType<{ className?: string }>
  /** Opens in a new tab (external site) vs. same tab (mailto). */
  external: boolean
}

const socials: Social[] = [
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

/** Row of social profile links styled as glossy bento buttons. */
export function SocialLinks() {
  return (
    <nav
      aria-label="Social profiles"
      className="mt-4 flex items-center justify-center gap-3"
    >
      {socials.map(({ label, href, Icon, external }) => (
        <AbhinavBentoButton
          key={label}
          href={href}
          aria-label={label}
          title={label}
          className="grid size-11 place-items-center p-0"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <Icon className="size-5 text-foreground" />
        </AbhinavBentoButton>
      ))}
    </nav>
  )
}
