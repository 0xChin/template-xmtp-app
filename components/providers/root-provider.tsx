"use client"

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { XMTPProvider } from "@xmtp/react-sdk"
import { ThemeProvider } from "next-themes"

import { useIsMounted } from "@/lib/hooks/use-is-mounted"
import { Privy } from "@/components/providers/privy"

const queryClient = new QueryClient()
interface RootProviderProps {
  children: ReactNode
}

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted()
  return isMounted ? (
    <XMTPProvider dbVersion={2}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Privy>{children}</Privy>
        </QueryClientProvider>
      </ThemeProvider>
    </XMTPProvider>
  ) : null
}
