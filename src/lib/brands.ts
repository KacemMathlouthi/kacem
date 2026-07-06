export type BrandStyle = {
  /** Path to the inline logo under `public/logos`. */
  logo?: string
  /** Accent color for the entity name (CSS color or token var). */
  color: string
}

/**
 * Brand accents for each organization / project mentioned in the bio.
 * Colors are brand-pastel and tuned for the dark theme.
 */
export const brands = {
  callab: { logo: "/logos/callab.png", color: "#f472b6" },
  yc: { logo: "/logos/yc.svg", color: "#fb651e" },
  gsoc: { logo: "/logos/gsoc.svg", color: "#f59e0b" },
  nrnb: { logo: "/logos/nrnb.svg", color: "var(--foreground)" },
  orange: { logo: "/logos/orange.svg", color: "#f97316" },
  ains: { logo: "/logos/ains.png", color: "#a78bfa" },
  ieee: { logo: "/logos/ieee-cs.svg", color: "#2f6fed" },
  insat: { logo: "/logos/insat-seal.png", color: "#d16a6a" },
  animus: { logo: "/logos/animus.svg", color: "#e7b277" },
  metis: { logo: "/logos/metis.svg", color: "#eab308" },
} satisfies Record<string, BrandStyle>
