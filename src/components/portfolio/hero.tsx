import { ChevronDownIcon } from "lucide-react"

import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInGrok,
  OpenInLabel,
  OpenInSeparator,
  OpenInTrigger,
} from "@/components/ai-elements/open-in-chat"
import {
  bentoSurfaceClassName,
  bentoSurfaceStyle,
} from "@/components/pixel-perfect/bento-surface"
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { CHAT_PROMPT } from "@/lib/chat-prompt"

/** Page heading, with a button to open an AI chat prefilled to talk about Kacem. */
export function Hero() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <h1 className="text-[1.75rem] font-semibold tracking-tight sm:text-[2rem]">
        Hi, I&apos;m Kacem Mathlouthi
      </h1>

      <OpenIn query={CHAT_PROMPT}>
        <OpenInTrigger
          className={cn(
            bentoSurfaceClassName,
            "ml-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground"
          )}
          style={bentoSurfaceStyle}
        >
          Open in chat
          <ChevronDownIcon className="size-4" />
        </OpenInTrigger>
        <OpenInContent>
          <DropdownMenuGroup>
            <OpenInLabel>Ask an AI about me</OpenInLabel>
            <OpenInSeparator />
            <OpenInChatGPT />
            <OpenInClaude />
            <OpenInGrok />
          </DropdownMenuGroup>
        </OpenInContent>
      </OpenIn>
    </div>
  )
}
