import { useCallback, useEffect } from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { usePrivyWagmi } from "@privy-io/wagmi-connector"
import { useClient } from "@xmtp/react-sdk"
import { useAccount, useNetwork } from "wagmi"

import { useEthersSigner } from "@/lib/hooks/web3/use-ethers-signer"
import { Button } from "@/components/ui/button"

export const XMTPCreateClient = () => {
  const { client, error, isLoading, initialize } = useClient()
  const { authenticated } = usePrivy()
  const { chain } = useNetwork()
  const walletClient = useEthersSigner({
    chainId: chain?.id,
  })

  const handleConnect = useCallback(async () => {
    if (!walletClient) return
    await initialize({ signer: walletClient })
  }, [walletClient, initialize])

  if (error) {
    return <span>An error occurred while initializing the client</span>
  }

  if (isLoading) {
    return <span>Awaiting signatures...</span>
  }

  if (!client) {
    return (
      <Button type="button" onClick={handleConnect} disabled={!authenticated}>
        {authenticated ? "Connect" : "Connect your wallet!"}
      </Button>
    )
  }

  return <span className="">Ready</span>
}
