import { useState } from "react"
import { useSendMessage } from "@xmtp/react-sdk"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type XMTPSendMessage = React.HTMLAttributes<HTMLElement> & {
  conversation: any
}

export const XMTPSendMessage = ({
  className,
  conversation,
}: XMTPSendMessage) => {
  const { sendMessage } = useSendMessage(conversation)
  const [message, setMessage] = useState("")

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(conversation, message)
      setMessage("")
    }
  }

  const classes = cn("flex items-center gap-x-4", className)
  return (
    <div className={classes}>
      <input
        className="input w-full"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  )
}
