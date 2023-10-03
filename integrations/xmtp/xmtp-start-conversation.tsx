import { useEffect, useState } from "react"
import {
  isValidAddress,
  useCanMessage,
  useStartConversation,
} from "@xmtp/react-sdk"
import { useEnsAddress } from "wagmi"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type XMTPStartConversation = React.HTMLAttributes<HTMLElement> & {}

export const XMTPStartConversation = ({ className }: XMTPStartConversation) => {
  const { startConversation } = useStartConversation()
  const { canMessage } = useCanMessage()
  const [peerAddress, setPeerAddress] = useState("")
  const [message, setMessage] = useState("")
  const [peerIsActive, setPeerIsActive] = useState<boolean>(false)
  const [canSendMessage, setCanSendMessage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const checkAddress = async (address: string) => {
    setIsLoading(true)
    const isPeerActive = await canMessage(address)
    setPeerIsActive(!!isPeerActive)
    setIsLoading(false)
  }

  const {
    data: ensResolvedAddress,
    isLoading: isEnsLoading,
    isFetching: isEnsFetching,
  } = useEnsAddress({
    name: peerAddress,
  })

  const handleAccountChange = async (event: any) => {
    setPeerAddress(event.target.value)
    if (isValidAddress(event.target.value)) {
      checkAddress(event.target.value)
    }
  }

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  const handleStartConversation = async () => {
    if (peerAddress.trim() !== "") {
      if (!canMessage(peerAddress)) return
      if (peerAddress.endsWith(".eth")) {
        startConversation(ensResolvedAddress, message)
      } else {
        startConversation(peerAddress, message)
      }
      setPeerAddress("")
      setMessage("")
    }
  }

  useEffect(() => {
    if (peerIsActive && message.length > 0) {
      setCanSendMessage(true)
    } else {
      setCanSendMessage(false)
    }
  }, [peerIsActive, message])

  useEffect(() => {
    if (ensResolvedAddress && isValidAddress(ensResolvedAddress))
      checkAddress(ensResolvedAddress)
  }, [ensResolvedAddress])

  const getFeedbackMessage = () => {
    if (
      isLoading ||
      (peerAddress.endsWith(".eth") && (isEnsLoading || isEnsFetching))
    ) {
      return "Finding address on the XMTP network"
    }

    if (
      peerAddress.length > 0 &&
      !isValidAddress(peerAddress) &&
      !peerAddress.endsWith(".eth")
    ) {
      return "Please enter a valid 0x wallet, or ENS address"
    }

    if (
      !isLoading &&
      !isEnsLoading &&
      !isEnsFetching &&
      !peerIsActive &&
      (isValidAddress(peerAddress) || peerAddress.endsWith(".eth"))
    ) {
      return "Sorry, we can't message this address because its owner hasn't used it with XMTP yet"
    }

    return ""
  }

  const classes = cn(className)

  return (
    <div className={classes}>
      <div className="mb-4">
        <input
          className="input mb-1 w-full"
          type="text"
          placeholder="Enter an address or ENS..."
          value={peerAddress}
          onChange={handleAccountChange}
        />
        <p className="text-left text-xs italic text-red-500">
          {getFeedbackMessage()}
        </p>
      </div>
      <div className={"flex items-center gap-x-4"}>
        <input
          className="input w-full"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleMessageChange}
        />
        <Button
          rounded={"lg"}
          disabled={!canSendMessage}
          variant={canSendMessage ? "dark" : "disabled"}
          onClick={handleStartConversation}
        >
          Send
        </Button>
      </div>
    </div>
  )
}
