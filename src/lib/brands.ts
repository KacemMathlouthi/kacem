export type BrandStyle = {
  /** Path to the inline logo under `public/logos`. */
  logo?: string
  /** Accent color for the entity name (CSS color or token var). */
  color: string
  /** Optional link; when set the entity name becomes a clickable anchor. */
  href?: string
}

/**
 * Brand accents for each organization / project mentioned in the bio.
 * Colors are brand-pastel and tuned for the dark theme.
 */
export const brands = {
  callab: {
    logo: "/logos/callab.png",
    color: "#f472b6",
    href: "https://callab.ai",
  },
  yc: {
    logo: "/logos/yc.svg",
    color: "#fb651e",
    href: "https://www.ycombinator.com/companies/callab-ai",
  },
  gsoc: {
    logo: "/logos/gsoc.svg",
    color: "#f59e0b",
    href: "https://summerofcode.withgoogle.com/archive/2025/projects/vFE5LPKW",
  },
  nrnb: {
    logo: "/logos/nrnb.svg",
    color: "var(--foreground)",
    href: "https://github.com/virtualcell/VCell-AI",
  },
  orange: {
    logo: "/logos/orange.svg",
    color: "#f97316",
    href: "https://www.orange.tn",
  },
  ains: {
    logo: "/logos/ains.png",
    color: "#a78bfa",
    href: "https://www.ai-national-summit.tech",
  },
  ieee: {
    logo: "/logos/ieee-cs.svg",
    color: "#2f6fed",
    href: "https://insat.ieee.tn/",
  },
  insat: {
    logo: "/logos/insat-seal.png",
    color: "#d16a6a",
    href: "https://insat.rnu.tn",
  },
  animus: {
    logo: "/logos/animus.svg",
    color: "#e7b277",
    href: "https://github.com/KacemMathlouthi/animus",
  },
  metis: {
    logo: "/logos/metis.svg",
    color: "#eab308",
    href: "https://github.com/KacemMathlouthi/metis",
  },
} satisfies Record<string, BrandStyle>
