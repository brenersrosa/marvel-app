import Image from 'next/image'

import { Character } from '@/types/marvel'

interface CharacterCardProps {
  character: Character
}

export function Card({ character }: CharacterCardProps) {
  return (
    <div className="relative flex w-full flex-grow flex-col rounded bg-zinc-900 object-cover text-center">
      <div className="h-60 w-full">
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt="Character thumbnail."
          width={500}
          height={500}
          className="h-full w-full rounded object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-1 max-w-xs font-title text-xl font-bold leading-relaxed text-zinc-100">
          {character.name}
        </h3>
        <p className="line-clamp-2 max-w-xs leading-relaxed text-zinc-200">
          {character.description === ''
            ? 'Insufficient information found for this character.'
            : character.description}
        </p>
      </div>
    </div>
  )
}
