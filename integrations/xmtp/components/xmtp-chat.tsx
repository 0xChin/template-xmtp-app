"use client"

import * as React from "react"
import {
  CachedConversation,
  ContentTypeMetadata,
  useClient,
  useConversations,
  useStreamAllMessages,
} from "@xmtp/react-sdk"

import { cn } from "@/lib/utils"

import { XMTPConversation } from "./xmtp-conversation"
import { XMTPConversations } from "./xmtp-conversations"
import { XMTPCreateClient } from "./xmtp-create-client"

type XMTPChat = React.HTMLAttributes<HTMLElement>

export const XMTPChat = ({ className }: XMTPChat) => {
  const classes = cn(className, "flex flex-col gap-y-2 ")
  const { client } = useClient()
  const [activeConversation, setActiveConversation] =
    React.useState<CachedConversation<ContentTypeMetadata> | null>(null)
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)

  useStreamAllMessages(
    () => {},
    () => {}
  )

  React.useEffect(() => {
    if (!client) {
      return
    }

    // Update screen width when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    // Listen for the resize event
    window.addEventListener("resize", handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [client])

  if (!client) {
    return (
      <div className={classes}>
        <XMTPCreateClient />
      </div>
    )
  }

  return (
    <div className={`${classes}`}>
      <div className="container mx-auto mt-4 flex justify-between ">
        {(screenWidth > 1024 || !activeConversation) && (
          <div className="h-[80vh] w-full overflow-auto shadow lg:block lg:w-[30%] xl:w-[25%]">
            <XMTPConversations
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
            />
          </div>
        )}
        {(screenWidth > 1024 || activeConversation) && (
          <div className="h-[80vh] w-full lg:block lg:w-[70%] xl:w-[75%] ">
            {!activeConversation ? (
              <div className="flex h-full items-center justify-center ">
                <p>Select a conversation</p>
              </div>
            ) : (
              <XMTPConversation
                conversation={activeConversation}
                setActiveConversation={setActiveConversation}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
