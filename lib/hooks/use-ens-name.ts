import { useEffect, useState } from "react"
import { SetStateAction } from "jotai"
import { createPublicClient, http } from "viem"
import { mainnet } from "wagmi"

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/pJUTf-weSijQ_KUmJGj383LDl2NnYgxD"
  ),
})

export default function useEnsName(address: `0x${string}`) {
  const [resolvedName, setResolvedName] =
    useState<SetStateAction<string | null>>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const updateName = async () => {
      setIsLoading(true)
      const name = await client.getEnsName({ address })
      setResolvedName(name)
      setIsLoading(false)
    }

    void updateName()
  }, [address])

  return { data: resolvedName, isLoading }
}
