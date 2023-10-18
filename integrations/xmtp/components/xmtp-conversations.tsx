"use client"

import { useState } from "react"
import { c } from "@wagmi/cli/dist/config-c09a23a5"
import { useConversations } from "@xmtp/react-sdk"

import { cn } from "@/lib/utils"

import { useConversationsAddresses } from "../hooks/use-conversations-addresses"
import { XMTPConversationItem } from "./xmtp-conversation-item"
import { XMTPStartConversation } from "./xmtp-start-conversation"

type XMTPConversationsProps = React.HTMLAttributes<HTMLElement> & {
  activeConversation: any
  setActiveConversation: (value: any) => void
}

export const XMTPConversations = ({
  className,
  activeConversation,
  setActiveConversation,
}: XMTPConversationsProps) => {
  const classes = cn(className, "flex flex-col items-center")
  const { conversations } = useConversations()
  const [search, setSearch] = useState("")
  const conversationsAccounts = useConversationsAddresses()

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value)
  }

  const searchMatches = (peerAddress: string) => {
    const account = conversationsAccounts.find(
      (account) => account.address === peerAddress
    )
    return peerAddress.startsWith(search) || account?.ens?.startsWith(search)
  }

  return (
    <div className={classes} style={{ overflow: "auto" }}>
      <div
        className="my-4 flex items-center justify-between"
        style={{ width: "95%" }}
      >
        <input
          className="input mr-2"
          type="text"
          placeholder="Search conversation..."
          value={search}
          onChange={handleSearchChange}
        />
        <XMTPStartConversation />
      </div>
      {conversations.map((conversation, index) => (
        <div
          className="w-full cursor-pointer"
          key={index}
          onClick={() => setActiveConversation(conversation)}
        >
          <XMTPConversationItem
            classNameCard={
              searchMatches(conversation.peerAddress)
                ? activeConversation?.peerAddress === conversation.peerAddress
                  ? "w-full bg-slate-200"
                  : "w-full"
                : "hidden"
            }
            conversation={conversation}
          />
        </div>
      ))}
    </div>
  )
}
