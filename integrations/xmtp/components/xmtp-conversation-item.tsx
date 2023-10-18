import { useEffect, useState } from "react"
import { useLastMessage } from "@xmtp/react-sdk"
import { AiFillCaretDown } from "react-icons/ai"
import { BiBlock } from "react-icons/bi"
import { FaUserFriends } from "react-icons/fa"
import { useAccount } from "wagmi"

import useEnsName from "@/lib/hooks/use-ens-name"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarBlockie } from "@/components/avatar-blockie"
import { Address } from "@/components/blockchain/address"
import { TimeFromDate } from "@/components/shared/time-from-date"

export const XMTPConversationItem = ({ classNameCard, conversation }: any) => {
  const classes = cn("flex flex-col rounded-none p-4 text-left", classNameCard)
  const { data: ens } = useEnsName(conversation.peerAddress as `0x${string}`)
  const lastMessage = useLastMessage(conversation.topic)
  const { address: user } = useAccount()
  const [triggerChange, setTriggerChange] = useState(false)

  const getLastMessageContent = (): string => {
    if (lastMessage) {
      const messageContent = lastMessage.content as string
      const words = messageContent.split(" ")

      if (words.length > 8) {
        return words.slice(0, 4).join(" ") + "..."
      } else {
        return messageContent
      }
    }

    return ""
  }

  const getLastMessageAuthor = (): string => {
    if (lastMessage) {
      return lastMessage.senderAddress === user ? "You: " : ""
    }

    return ""
  }

  const block = () => {
    const blockedConversations = localStorage.getItem("blockedConversations")
    if (blockedConversations) {
      const updatedBlockedConversations = [
        ...JSON.parse(blockedConversations),
        conversation.peerAddress,
      ]

      localStorage.setItem(
        "blockedConversations",
        JSON.stringify(updatedBlockedConversations)
      )
    } else {
      localStorage.setItem(
        "blockedConversations",
        JSON.stringify([conversation.peerAddress])
      )
    }

    setTriggerChange(!triggerChange)
  }

  const switchFriend = () => {
    const friends = localStorage.getItem("friends")

    if (friends) {
      const updatedFriends = JSON.parse(friends) as string[]
      const friendIndex = updatedFriends.indexOf(conversation.peerAddress)
      if (friendIndex !== -1) {
        updatedFriends.splice(friendIndex, 1)
        localStorage.setItem("friends", JSON.stringify(updatedFriends))
      } else {
        updatedFriends.push(conversation.peerAddress)
        localStorage.setItem("friends", JSON.stringify(updatedFriends))
      }
    } else {
      localStorage.setItem(
        "friends",
        JSON.stringify([conversation.peerAddress])
      )
    }

    setTriggerChange(!triggerChange)
  }

  const isBlocked = () => {
    const blockedConversations = localStorage.getItem("blockedConversations")
    if (blockedConversations) {
      const blockedAddresses = JSON.parse(blockedConversations) as string[]
      return blockedAddresses.includes(conversation.peerAddress)
    }

    return false
  }

  const isFriend = () => {
    const friends = localStorage.getItem("friends")
    if (friends) {
      const friendAddresses = JSON.parse(friends) as string[]
      return friendAddresses.includes(conversation.peerAddress)
    }

    return false
  }

  useEffect(() => {
    // Refresh component when friend or blocked status changes
    if (triggerChange) {
      // You may choose to refresh the component or take specific actions here
    }
  }, [triggerChange])

  return !isBlocked() ? (
    <Card className={classes}>
      <div className="flex items-center justify-between gap-x-6 ">
        <div className=" flex w-full items-center justify-between gap-x-6">
          <div className="flex items-center gap-x-1">
            <AvatarBlockie
              className="rounded-full"
              styled
              address={conversation.peerAddress}
            />
            <Address
              address={conversation.peerAddress}
              ens={ens?.toString()}
              truncate={true}
            />
            {isFriend() && (
              <FaUserFriends className="mr-2 h-4 w-4 text-green-500" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-9 px-0">
                <AiFillCaretDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={switchFriend}>
                <span
                  className={
                    isFriend()
                      ? "flex items-center text-red-500"
                      : "flex items-center text-green-500"
                  }
                >
                  <FaUserFriends className="mr-2 h-4 w-4" />
                  {isFriend() ? "Remove friend" : "Add friend"}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={block} style={{ color: "red" }}>
                <BiBlock className="mr-2 h-4 w-4" />
                Block
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <span className="text-xs">{`${getLastMessageAuthor()} ${getLastMessageContent()}`}</span>
        <span className="text-xs">
          <TimeFromDate date={conversation.updatedAt} type="DATETIME" />
        </span>
      </div>
    </Card>
  ) : (
    <></>
  )
}
