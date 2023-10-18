"use client"

import { useClient } from "@xmtp/react-sdk"

import { XMTPChat } from "@/integrations/xmtp/components/xmtp-chat"

export default function HomePage() {
  const { client } = useClient()

  return (
    <main
      className={`flex flex-1 flex-col items-center ${client ? "" : "my-32"}`}
    >
      <div className={`mb-8 text-center ${client ? "w-full" : ""}`}>
        {!client && (
          <>
            <h3 className="mb-4 text-4xl font-bold">Social</h3>
            <p className="mb-4 text-sm">
              Connect with your friends, communities and colleagues.
            </p>
          </>
        )}
        <XMTPChat className="w-full" />
      </div>
    </main>
  )
}
