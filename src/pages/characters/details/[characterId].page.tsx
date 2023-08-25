import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { CharacterDataWrapper } from '@/types/marvel'

import { detailCharacter } from '@/utils/marvel'
import { Carousel } from '@/components/characters/Carousel'
import { Header } from '@/components/global/Header'
import { Navbar } from '@/components/global/Navbar'
import { Loading } from '@/components/global/Loading'

export default function CharacterDetail() {
  const router = useRouter()
  const characterId = router.query.characterId as string
  const [characterDetails, setCharacterDetails] =
    useState<CharacterDataWrapper | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCharacterDetails() {
      try {
        setIsLoading(true)
        const characterData = await detailCharacter(characterId)
        setCharacterDetails(characterData)
      } catch (error) {
        console.error('Error fetching character details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (characterId) {
      fetchCharacterDetails()
    }
  }, [characterId])

  return (
    <div className="grid-cols-dashboard grid-rows-dashboard grid h-screen bg-zinc-600">
      <div className="row-span-3">
        <Navbar />
      </div>

      <div className="col-span-2">
        <Header
          title={
            characterDetails
              ? characterDetails.results[0].name
              : 'Characters details'
          }
        />
      </div>

      <div className="col-span-2 col-start-2 row-span-2 row-start-2 overflow-y-scroll bg-home">
        <div className="mx-auto flex h-full gap-8 p-12">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loading />
            </div>
          ) : (
            characterDetails && (
              <>
                <div className="flex w-96 flex-col items-center justify-between gap-6 bg-zinc-900 px-6 py-8 text-center">
                  <span className="uppercase">
                    id: {characterDetails.results[0].id}
                  </span>
                  <div className="h-32 w-32">
                    <Image
                      src={`${characterDetails.results[0].thumbnail.path}.${characterDetails?.results[0].thumbnail.extension}`}
                      alt={characterDetails.results[0].name}
                      width={300}
                      height={300}
                      className="rounded"
                    />
                  </div>

                  <strong className="text-xl font-bold text-zinc-50">
                    {characterDetails.results[0].name}
                  </strong>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-zinc-300">
                        Description:
                      </label>
                      <span className="max-h-48 overflow-y-scroll pr-4 text-lg text-zinc-50">
                        {characterDetails.results[0].description === ''
                          ? 'Insufficient information found for this character.'
                          : characterDetails.results[0].description}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-zinc-300">
                        Number of comic appearances:
                      </label>
                      <span className="text-lg text-zinc-50">
                        {characterDetails.results[0].comics.length}
                      </span>
                    </div>
                  </div>

                  <span className="font-barCode text-5xl font-thin">
                    {characterDetails.results[0].id}
                  </span>
                </div>

                {characterDetails.results[0].comics.length === 0 ? (
                  <div className="flex h-full w-[672px] flex-col items-center justify-center gap-4 rounded border border-dashed border-zinc-700 bg-zinc-900 p-8">
                    <strong className="text-xl uppercase">Sorry,</strong>
                    <span>
                      this character has no recorded comic book appearances.
                    </span>
                  </div>
                ) : (
                  <Carousel
                    data={characterDetails.results[0].comics}
                    autoSlide={false}
                    autoSlideInterval={3000}
                  />
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  )
}
