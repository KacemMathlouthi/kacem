import { useState } from "react"
import { Check, Mail } from "lucide-react"

import AbhinavBentoButton from "@/components/pixel-perfect/abhinav-bento-button"

import { IconSwap } from "./icon-swap"

const EMAIL = "kacem.mathlouthi@insat.ucar.tn"

// Hoisted to module scope so each render passes the same element reference
// to IconSwap instead of constructing brand-new JSX every time.
const mailIcon = <Mail className="size-[1.15rem] text-foreground" />
const checkIcon = <Check className="size-[1.15rem] text-foreground" />

/** Copies the email to the clipboard (falling back to a mailto link). */
export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <AbhinavBentoButton
      type="button"
      onClick={handleClick}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      title={copied ? "Copied!" : EMAIL}
      className="grid size-10 place-items-center p-0"
    >
      <IconSwap
        state={copied ? "b" : "a"}
        iconA={mailIcon}
        iconB={checkIcon}
      />
    </AbhinavBentoButton>
  )
}
