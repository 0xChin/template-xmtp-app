import { HTMLAttributes } from "react"
import { useNetwork, type Address as AddressType } from "wagmi"

import { LinkComponent } from "../shared/link-component"

interface AddressProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  address: string
  ens?: string | null
  truncate?: boolean
  isLink?: boolean
}

export const Address = ({
  address,
  ens,
  className,
  truncate,
  isLink,
  ...props
}: AddressProps) => {
  const { chain } = useNetwork()
  const blockExplorerUrl = chain?.blockExplorers?.default.url
  const formattedAddress = truncate
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : address

  if (isLink && blockExplorerUrl) {
    return (
      <LinkComponent
        isExternal
        className={className}
        href={`${blockExplorerUrl}/address/${address}`}
        {...props}
      >
        {formattedAddress}
      </LinkComponent>
    )
  }

  return (
    <span className={className} {...props}>
      {ens ?? formattedAddress}
    </span>
  )
}
