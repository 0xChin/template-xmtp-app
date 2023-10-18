import { useEffect, useState } from "react"
import { useConversations } from "@xmtp/react-sdk"
import { createPublicClient, http } from "viem"
import { mainnet } from "wagmi"

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/pJUTf-weSijQ_KUmJGj383LDl2NnYgxD"
  ),
})

interface Account {
  address: string
  ens: string | null
}

export const useConversationsAddresses = () => {
  const { conversations } = useConversations()
  const [addresses, setAddresses] = useState<Account[]>([])

  useEffect(() => {
    const fetchAddresses = () => {
      const newAddresses: Account[] = []
      conversations.forEach(async (conversation) => {
        const ens = await client.getEnsName({
          address: conversation.peerAddress as `0x${string}`,
        })
        const account: Account = { address: conversation.peerAddress, ens }
        newAddresses.push(account)
      })
      setAddresses(newAddresses)
    }
    if (conversations.length > 0) {
      fetchAddresses()
    }
  }, [conversations])

  return addresses
}
