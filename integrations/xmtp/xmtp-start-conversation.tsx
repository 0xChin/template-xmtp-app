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
    refetch: ensRefetch,
  } = useEnsAddress({
    name: peerAddress,
    chainId: 1,
    enabled: false,
  })

  const handleAccountChange = async (event: any) => {
    const newPeerAddress: string = event.target.value
    setPeerAddress(event.target.value)
    if (isValidAddress(event.target.value)) {
      await checkAddress(event.target.value)
    }
    if (newPeerAddress.endsWith(".eth")) {
      console.log("refetching")
      await ensRefetch()
    }
  }

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  const handleStartConversation = async () => {
    if (peerAddress.trim() !== "") {
      if (
        peerAddress.endsWith(".eth") &&
        typeof ensResolvedAddress === "string"
      ) {
        if (!canMessage(ensResolvedAddress)) return
        await startConversation(ensResolvedAddress, message)
      } else {
        if (!canMessage(peerAddress)) return
        await startConversation(peerAddress, message)
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
    const checkEnsAddress = async (ensResolvedAddress: string) => {
      await checkAddress(ensResolvedAddress)
    }

    if (ensResolvedAddress && isValidAddress(ensResolvedAddress)) {
      checkEnsAddress(ensResolvedAddress).catch((err) => console.log(err))
    }
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
        <Button disabled={!canSendMessage} onClick={handleStartConversation}>
          Send
        </Button>
      </div>
    </div>
  )
}
