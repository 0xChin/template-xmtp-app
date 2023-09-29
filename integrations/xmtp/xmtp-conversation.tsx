import { useMessages, useSendMessage, useStreamMessages } from "@xmtp/react-sdk"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AvatarBlockie } from "@/components/avatar-blockie"
import { Address } from "@/components/blockchain/address"
import { TimeFromDate } from "@/components/shared/time-from-date"

import { XMTPMessage } from "./xmtp-message"
import { XMTPSendMessage } from "./xmtp-send-message"

type Conversation = {
  context?: undefined
  createdAt: Date
  id: number
  isReady: boolean
  peerAddress: string
  topic: string
  updatedAt: Date
  walletAddress: string
}

type XMTPConversation = React.HTMLAttributes<HTMLElement> & {
  classNameTrigger?: string
  classNameCard?: string
  conversation: Conversation
}

export const XMTPConversation = ({
  classNameTrigger,
  classNameCard,
  conversation,
}: any) => {
  const { messages, isLoading } = useMessages(conversation)
  const classesCard = cn(classNameCard, "flex flex-col p-4 text-left")
  return (
    <div>
      <Dialog>
        <DialogTrigger className={classNameTrigger}>
          <Card className={classesCard}>
            <div className="flex items-center gap-x-6">
              <AvatarBlockie
                className="rounded-full"
                styled
                address={conversation.peerAddress}
              />
              <Address address={conversation.peerAddress} />
            </div>
            <span className="mt-4 text-xs">
              Last Update:{" "}
              <TimeFromDate date={conversation.updatedAt} type="DATETIME" />
            </span>
          </Card>
        </DialogTrigger>
        <DialogContent className="fix inset-y-0 right-0 flex-col rounded-none pt-12">
          <div className="flex h-full flex-1 flex-col gap-y-4">
            {!isLoading &&
              messages?.map((message) => (
                <XMTPMessage key={message.id} message={message} />
              ))}
          </div>
          <div className="self-end">
            <XMTPSendMessage className="w-full" conversation={conversation} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
