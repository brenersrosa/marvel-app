import { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'

import { AuthContext } from '@/contexts/AuthContext'

import { api } from '@/lib/axios'

import { Character } from '@/types/marvel'
import clsx from 'clsx'

interface CharacterCardProps {
  character: Character
  isFavorite?: boolean
}

export function Card({ character, isFavorite }: CharacterCardProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const { user } = useContext(AuthContext)

  async function handleFavoriteToggle() {
    if (isProcessing) {
      return
    }

    setIsProcessing(true)

    try {
      await api.post('/characters/favorite', {
        userId: user?.id,
        characterId: String(character.id),
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

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

        <button
          onClick={handleFavoriteToggle}
          className="absolute right-3 top-3"
          disabled={isProcessing}
        >
          <Heart
            className={clsx(
              'h-8 w-8 text-transparent transition-colors hover:fill-red-500',
              {
                'fill-red-600': isFavorite,
                'fill-zinc-400': !isFavorite,
              },
            )}
          />
        </button>
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

      <Link href={`/characters/details/${character.id}`}>View Details</Link>
    </div>
  )
}
