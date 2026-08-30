import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react"

import { cn } from "@/lib/utils"

import { bentoSurfaceClassName, bentoSurfaceStyle } from "./bento-surface"

const surfaceClassName = `px-4 py-2 aspect-square ${bentoSurfaceClassName}`

type BaseProps = { className?: string; children?: ReactNode }
type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

// An anchor when `href` is set, otherwise a button. Same bento surface.
export default function AbhinavBentoButton({
  className,
  children,
  ...props
}: ButtonProps | AnchorProps) {
  const classes = cn(surfaceClassName, className)

  if (props.href !== undefined) {
    return (
      <a className={classes} style={bentoSurfaceStyle} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} style={bentoSurfaceStyle} {...props}>
      {children || "Bento"}
    </button>
  )
}
