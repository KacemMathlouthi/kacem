import { useState } from "react"
import { Check, Mail } from "lucide-react"

import AbhinavBentoButton from "@/components/pixel-perfect/abhinav-bento-button"

import { IconSwap } from "./icon-swap"

const EMAIL = "kacem.mathlouthi@insat.ucar.tn"

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
      className="grid size-11 place-items-center p-0"
    >
      <IconSwap
        state={copied ? "b" : "a"}
        iconA={<Mail className="size-5 text-foreground" />}
        iconB={<Check className="size-5 text-foreground" />}
      />
    </AbhinavBentoButton>
  )
}
