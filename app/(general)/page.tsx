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
