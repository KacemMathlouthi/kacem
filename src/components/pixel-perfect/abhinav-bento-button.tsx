import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react"

import { cn } from "@/lib/utils"

const surfaceClassName =
  "px-4 py-2 rounded-full aspect-square transition-transform duration-200 ease-out hover:-translate-y-0.5"

// Glossy raised surface: soft outer halo + bright inset rim, from theme tokens.
const surfaceStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, var(--secondary) 0%, color-mix(in srgb, var(--secondary) 55%, #000) 100%)",
  backgroundBlendMode: "plus-lighter, normal",
  boxShadow:
    "0px 24px 60px color-mix(in srgb, var(--foreground) 18%, transparent), 0px 14px 20px color-mix(in srgb, var(--foreground) 10%, transparent), 0px 6px 9px color-mix(in srgb, var(--foreground) 12%, transparent), 0px 2px 4px color-mix(in srgb, var(--foreground) 8%, transparent), inset 0px 1px 18px 2px color-mix(in srgb, var(--foreground) 55%, transparent), inset 0px 1px 4px 2px color-mix(in srgb, var(--foreground) 75%, transparent)",
}

type BaseProps = { className?: string; children?: ReactNode }
type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/**
 * Renders as an anchor when `href` is provided (so links stay real links),
 * otherwise as a button. Both share the same glossy bento surface.
 */
export default function AbhinavBentoButton({
  className,
  children,
  ...props
}: ButtonProps | AnchorProps) {
  const classes = cn(surfaceClassName, className)

  if (props.href !== undefined) {
    return (
      <a className={classes} style={surfaceStyle} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} style={surfaceStyle} {...props}>
      {children || "Bento"}
    </button>
  )
}
