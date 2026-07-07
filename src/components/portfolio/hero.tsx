import { ChevronDownIcon } from "lucide-react"

import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInLabel,
  OpenInSeparator,
  OpenInTrigger,
} from "@/components/ai-elements/open-in-chat"
import { Button } from "@/components/ui/button"
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { CHAT_PROMPT } from "@/lib/chat-prompt"

/** Page heading, with a button to open an AI chat prefilled to talk about Kacem. */
export function Hero() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <h1 className="text-[1.75rem] font-semibold tracking-tight sm:text-[2rem]">
        Hi, I&apos;m Kacem Mathlouthi
      </h1>

      <OpenIn query={CHAT_PROMPT}>
        <OpenInTrigger render={<Button variant="outline" size="sm" />}>
          Open in chat
          <ChevronDownIcon className="size-4" />
        </OpenInTrigger>
        <OpenInContent>
          <DropdownMenuGroup>
            <OpenInLabel>Ask an AI about me</OpenInLabel>
            <OpenInSeparator />
            <OpenInChatGPT />
            <OpenInClaude />
          </DropdownMenuGroup>
        </OpenInContent>
      </OpenIn>
    </div>
  )
}
