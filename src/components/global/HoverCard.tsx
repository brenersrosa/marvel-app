import * as HoverCardRadix from '@radix-ui/react-hover-card'
import clsx from 'clsx'
import { Info } from 'lucide-react'

interface HoverCardProps {
  message?: string
  error?: string
}

export function HoverCard({ message, error }: HoverCardProps) {
  return (
    <HoverCardRadix.Root>
      <HoverCardRadix.Trigger asChild className="absolute right-4 h-4 w-4">
        <Info
          size={16}
          className={clsx('transition-colors hover:cursor-pointer', {
            'text-red-500 hover:text-red-600': error,
            'text-zinc-500 hover:text-zinc-400': message,
          })}
        />
      </HoverCardRadix.Trigger>
      <HoverCardRadix.Portal>
        <HoverCardRadix.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade max-w-[300px] rounded border border-zinc-700 bg-zinc-900 p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="text-center font-sans leading-relaxed">
            {error ? <span>{error}</span> : <span>{message}</span>}
          </div>
          <HoverCardRadix.Arrow className="fill-zinc-900" />
        </HoverCardRadix.Content>
      </HoverCardRadix.Portal>
    </HoverCardRadix.Root>
  )
}
