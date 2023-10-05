import { useEffect, useState } from "react"
import { SetStateAction } from "jotai"
import { createPublicClient, http } from "viem"
import { mainnet } from "wagmi"

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
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
      updateAddress().catch((err) => console.log(err))
    }
  }, [name])

  return { data: resolvedAddress, isLoading }
}
