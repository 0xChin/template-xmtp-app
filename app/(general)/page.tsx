import Image from "next/image"
import Link from "next/link"
import { FaDiscord, FaGithub } from "react-icons/fa"
import { LuBook } from "react-icons/lu"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { CopyButton } from "@/components/shared/copy-button"
import { XMTPChat } from "@/integrations/xmtp/xmtp-chat"

export default function HomePage() {
  return (
    <main className="my-32 flex flex-1 flex-col items-center md:px-10">
      <div className="mb-8 text-center">
        <h3 className="mb-4 text-4xl font-bold">Social</h3>
        <p className="text-sm">
          Connect with your friends, communities and colleagues.
        </p>
        <XMTPChat className="mt-10" />
      </div>
    </main>
  )
}
