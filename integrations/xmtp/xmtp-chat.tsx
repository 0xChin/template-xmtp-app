"use client"

import * as React from "react"
import { useClient, useConversations } from "@xmtp/react-sdk"

import { cn } from "@/lib/utils"

import { XMTPConversation } from "./xmtp-conversation"
import { XMTPCreateClient } from "./xmtp-create-client"
import { XMTPStartConversation } from "./xmtp-start-conversation"

type XMTPChat = React.HTMLAttributes<HTMLElement>

export const XMTPChat = ({ className }: XMTPChat) => {
  const classes = cn(className, "flex flex-col gap-y-2 ")
  const { client } = useClient()

  const { conversations } = useConversations()

  if (!client)
    return (
      <div className={classes}>
        <XMTPCreateClient />
      </div>
    )
  return (
    <div className={classes}>
      <div className="">
        <XMTPStartConversation />
      </div>
      <div className={classes}>
        {conversations?.map((conversation, index) => (
          <XMTPConversation
            key={index}
            classNameTrigger="w-full"
            conversation={conversation}
          />
        ))}
      </div>
    </div>
  )
}
