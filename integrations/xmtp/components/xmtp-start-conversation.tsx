import { FormEvent, useEffect, useState } from "react"
import {
  isValidAddress,
  useCanMessage,
  useStartConversation,
} from "@xmtp/react-sdk"
import { AiFillPlusCircle } from "react-icons/ai"

import useEnsAddress from "@/lib/hooks/use-ens-address"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type XMTPStartConversation = React.HTMLAttributes<HTMLElement> & {}

export const XMTPStartConversation = ({ className }: XMTPStartConversation) => {
  const { startConversation } = useStartConversation()
  const { canMessage } = useCanMessage()
  const [peerAddress, setPeerAddress] = useState("")
  const [message, setMessage] = useState("")
  const [peerIsActive, setPeerIsActive] = useState<boolean>(false)
  const [canSendMessage, setCanSendMessage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const checkAddress = async (address: string) => {
    setIsLoading(true)
    const isPeerActive = await canMessage(address)
    setPeerIsActive(!!isPeerActive)
    setIsLoading(false)
  }

  const { data: ensResolvedAddress, isLoading: isEnsLoading } =
    useEnsAddress(peerAddress)

  const handleAccountChange = async (event: any) => {
    setPeerAddress(event.target.value)
    if (isValidAddress(event.target.value)) {
      await checkAddress(event.target.value)
    }
  }

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  const handleStartConversation = async (e: FormEvent) => {
    e.preventDefault()
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
      setOpen(false)
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

    if (
      typeof ensResolvedAddress === "string" &&
      isValidAddress(ensResolvedAddress)
    ) {
      void checkEnsAddress(ensResolvedAddress)
    }
  }, [ensResolvedAddress])

  const getFeedbackMessage = () => {
    if (isLoading || (peerAddress.endsWith(".eth") && isEnsLoading)) {
      return "Finding address on the XMTP network"
    }

    if (
      peerAddress.length > 0 &&
      !isValidAddress(peerAddress) &&
      !peerAddress.endsWith(".eth")
    ) {
      return "Please enter a valid 0x wallet, or ENS address"
    }

    if (!ensResolvedAddress && peerAddress.endsWith(".eth")) {
      return "An error occured resolving the address from the ENS"
    }

    if (
      !isLoading &&
      !isEnsLoading &&
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="blue" size={"icon"}>
            <AiFillPlusCircle />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>New conversation</DialogTitle>
          <div>
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
          <form
            className={"flex items-center gap-x-4"}
            onSubmit={handleStartConversation}
          >
            <input
              className="input w-full"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleMessageChange}
            />
            <Button disabled={!canSendMessage} type="submit">
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
