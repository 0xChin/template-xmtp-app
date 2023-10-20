import { useEffect, useState } from "react"
import { useConversations } from "@xmtp/react-sdk"
import { BiBlock, BiUnlink } from "react-icons/bi"
import { FaUserFriends } from "react-icons/fa"

import { shorten } from "@/lib/utils/shorten"
import { AvatarBlockie } from "@/components/avatar-blockie"

import { useConversationsAddresses } from "../hooks/use-conversations-addresses"

export const XMTPContacts = () => {
  const { conversations } = useConversations()
  const conversationsAccounts = useConversationsAddresses()
  const [triggerChange, setTriggerChange] = useState(false)

  // Functions to add/remove friends and block/unblock conversations
  const addRemoveFriend = (address: string) => {
    const friends = localStorage.getItem("friends")

    if (friends) {
      const updatedFriends = JSON.parse(friends) as string[]
      const friendIndex = updatedFriends.indexOf(address)
      if (friendIndex !== -1) {
        updatedFriends.splice(friendIndex, 1)
        localStorage.setItem("friends", JSON.stringify(updatedFriends))
      } else {
        updatedFriends.push(address)
        localStorage.setItem("friends", JSON.stringify(updatedFriends))
      }
    } else {
      localStorage.setItem("friends", JSON.stringify([address]))
    }

    setTriggerChange(!triggerChange)
  }

  const blockUnblock = (address: string) => {
    const blockedConversations = localStorage.getItem("blockedConversations")

    if (blockedConversations) {
      const updatedFriends = JSON.parse(blockedConversations) as string[]
      const blockConversation = updatedFriends.indexOf(address)
      if (blockConversation !== -1) {
        updatedFriends.splice(blockConversation, 1)
        localStorage.setItem(
          "blockedConversations",
          JSON.stringify(updatedFriends)
        )
      } else {
        updatedFriends.push(address)
        localStorage.setItem(
          "blockedConversations",
          JSON.stringify(updatedFriends)
        )
      }
    } else {
      localStorage.setItem("blockedConversations", JSON.stringify([address]))
    }

    setTriggerChange(!triggerChange)
  }

  const isFriend = (address: string) => {
    const friends = localStorage.getItem("friends")
    if (friends) {
      const friendAddresses = JSON.parse(friends) as string[]
      return friendAddresses.includes(address)
    }

    return false
  }

  const isBlocked = (address: string) => {
    const blocked = localStorage.getItem("blockedConversations")
    if (blocked) {
      const blockedAddresses = JSON.parse(blocked) as string[]
      return blockedAddresses.includes(address)
    }

    return false
  }

  useEffect(() => {
    // Refresh component when friend or blocked status changes
    if (triggerChange) {
      // You may choose to refresh the component or take specific actions here
    }
  }, [triggerChange])

  return (
    <div className="container mt-5">
      <h1 className="text-2xl">Contacts</h1>
      <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-center gap-4">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className="w-full rounded-lg bg-white p-4 shadow md:w-1/3 xl:w-1/5"
          >
            <div className="mb-2 flex items-center gap-x-2 text-lg font-semibold">
              <AvatarBlockie
                className="rounded-full"
                styled
                address={conversation.peerAddress}
              />
              {conversationsAccounts.find(
                (c) => c.address === conversation.peerAddress
              )?.ens || shorten(conversation.peerAddress)}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="p-2"
                onClick={() => addRemoveFriend(conversation.peerAddress)}
              >
                {isFriend(conversation.peerAddress) ? (
                  <p className="flex items-center text-red-500">
                    <FaUserFriends className="mr-2" />
                    Remove
                  </p>
                ) : (
                  <p className="flex items-center text-green-500">
                    <FaUserFriends className="mr-2" />
                    Add
                  </p>
                )}
              </button>
              <button
                className="p-2"
                onClick={() => blockUnblock(conversation.peerAddress)}
              >
                {isBlocked(conversation.peerAddress) ? (
                  <p className="flex items-center text-green-500">
                    <BiBlock className="mr-2" />
                    Unblock
                  </p>
                ) : (
                  <p className="flex items-center text-red-500">
                    <BiBlock className="mr-2" />
                    Block
                  </p>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
