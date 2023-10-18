import { CachedMessage } from "@xmtp/react-sdk"

import { cn } from "@/lib/utils"
import { AvatarBlockie } from "@/components/avatar-blockie"

type MessageContent = React.HTMLAttributes<HTMLElement> & {
  content: string
  contentBytes?: undefined
  contentFallback?: undefined
  contentType: string
  conversationTopic: string
  hasSendError: boolean
  id: number
  isSending: boolean
  senderAddress: string
  sentAt: Date
  status: string
  uuid: string
  walletAddress: string
  xmtpID: string
}

type XMTPMessage = React.HTMLAttributes<HTMLElement> & {
  message: CachedMessage<any, any>
}

export const XMTPMessage = ({ className, message }: XMTPMessage) => {
  const classes = cn(className, "flex items-center rounded-md p-2", {
    "justify-end": message.senderAddress === message.walletAddress,
  })
  return (
    <div className={classes}>
      {message.senderAddress !== message.walletAddress ? (
        <>
          <div className="mr-4 inline-block">
            <AvatarBlockie
              className="rounded-full"
              styled
              address={message.senderAddress}
            />
          </div>
          <div
            className="rounded-lg bg-blue-200 p-2 "
            style={{ maxWidth: "60%", wordWrap: "break-word" }}
          >
            <p className="text-sm leading-6">{message.content}</p>
          </div>
        </>
      ) : (
        <>
          <div
            className="rounded-lg bg-green-200 p-2 "
            style={{ maxWidth: "60%", wordWrap: "break-word" }}
          >
            <p className="text-sm leading-6">{message.content}</p>
          </div>
          <div className="ml-4 inline-block">
            <AvatarBlockie
              className="rounded-full"
              styled
              address={message.senderAddress}
            />
          </div>
        </>
      )}
    </div>
  )
}
