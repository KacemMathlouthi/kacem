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
    <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-3 sm:text-left">
      <h1 className="text-[1.55rem] font-semibold tracking-tight sm:text-[1.8rem]">
        Hi, I&apos;m Kacem Mathlouthi
      </h1>

      <OpenIn query={CHAT_PROMPT}>
        <OpenInTrigger
          className={cn(
            bentoSurfaceClassName,
            "inline-flex items-center gap-2 px-3.5 py-2 text-[0.8rem] font-medium text-foreground sm:ml-auto"
          )}
          style={bentoSurfaceStyle}
        >
          Open in chat
          <ChevronDownIcon className="size-3.5" />
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
