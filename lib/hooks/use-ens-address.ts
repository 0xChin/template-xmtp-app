import { SetStateAction, useEffect, useState } from "react"
import { createPublicClient, http } from "viem"
import { mainnet } from "wagmi"

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/pJUTf-weSijQ_KUmJGj383LDl2NnYgxD"
  ),
})

export default function useEnsAddress(name: string) {
  const [resolvedAddress, setResolvedAddress] =
    useState<SetStateAction<string | null>>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const updateAddress = async () => {
      setIsLoading(true)
      const address = await client.getEnsAddress({ name })
      setResolvedAddress(address)
      setIsLoading(false)
    }

    if (name.endsWith(".eth")) {
      void updateAddress()
    }
  }, [name])

  return { data: resolvedAddress, isLoading }
}
