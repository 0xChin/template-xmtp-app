import { FormEvent, useState } from "react"
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

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() !== "") {
      await sendMessage(conversation, message)
      setMessage("")
    }
  }

  const classes = cn("flex items-center gap-x-4", className)
  return (
    <form className={classes} onSubmit={handleSendMessage}>
      <input
        className="input w-full"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
      />
      <Button type="submit">Send</Button>
    </form>
  )
}
