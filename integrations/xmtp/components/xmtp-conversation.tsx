import { useMessages } from "@xmtp/react-sdk"

import useEnsName from "@/lib/hooks/use-ens-name"
import { AvatarBlockie } from "@/components/avatar-blockie"

import { XMTPMessage } from "./xmtp-message"
import { XMTPSendMessage } from "./xmtp-send-message"

type XMTPConversationProps = React.HTMLAttributes<HTMLElement> & {
  conversation: any
  setActiveConversation: (value: any) => void
}

export const XMTPConversation = ({
  conversation,
  setActiveConversation,
}: XMTPConversationProps) => {
  const { messages, isLoading } = useMessages(conversation)
  const { data: ens } = useEnsName(conversation.peerAddress as `0x${string}`)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="sticky top-0 z-10 flex items-center border-b border-gray-200 bg-white p-2 shadow">
        <button onClick={() => setActiveConversation(null)} className="p-2">
          &lt;
        </button>
        <AvatarBlockie
          className="rounded-full"
          styled
          address={conversation.peerAddress}
        />
        <div className="ml-2">
          <h3 className="text-lg font-semibold">
            {ens || conversation.peerAddress}
          </h3>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {!isLoading &&
          messages?.map((message) => (
            <XMTPMessage key={message.id} message={message} />
          ))}
      </div>
      <div className="bg-slate-200">
        <XMTPSendMessage
          className="m-auto w-[95%]"
          conversation={conversation}
        />
      </div>
    </div>
  )
}
