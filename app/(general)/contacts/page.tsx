"use client"

import { useClient } from "@xmtp/react-sdk"

import { XMTPContacts } from "@/integrations/xmtp/components/xmtp-contacts"
import { XMTPCreateClient } from "@/integrations/xmtp/components/xmtp-create-client"

export default function HomePage() {
  const { client } = useClient()

  return (
    <main
      className={`flex flex-1 flex-col items-center ${client ? "" : "my-32"}`}
    >
      <div className={`mb-8 text-center ${client ? "w-full" : ""}`}>
        {!client ? (
          <>
            <h3 className="mb-4 text-4xl font-bold">Social</h3>
            <p className="mb-4 text-sm">
              Connect with your friends, communities and colleagues.
            </p>
            <XMTPCreateClient />
          </>
        ) : (
          <XMTPContacts />
        )}
      </div>
    </main>
  )
}
