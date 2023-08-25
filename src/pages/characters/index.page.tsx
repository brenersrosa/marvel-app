import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Header } from '@/components/global/Header'
import { Navbar } from '@/components/global/Navbar'
import { Card } from '@/components/characters/Card'

import { getCharacters } from '@/utils/marvel'

import { Character, CharacterDataWrapper } from '@/types/marvel'
import { GetServerSideProps } from 'next'

interface CharactersPageProps {
  charactersData: CharacterDataWrapper
}

export default function Characters({ charactersData }: CharactersPageProps) {
  const router = useRouter()

  const { query } = router
  const currentPage = parseInt(query.page as string, 10) || 1

  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setCharacters(charactersData.results)
    setTotalPages(Math.ceil(charactersData.total / 20))
  }, [charactersData])

  function handleNextPage() {
    if (currentPage < totalPages) {
      router.push({ query: { page: (currentPage + 1).toString() } })
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      router.push({ query: { page: (currentPage - 1).toString() } })
    }
  }

  return (
    <div className="grid-cols-dashboard grid-rows-dashboard grid h-screen bg-zinc-600">
      <div className="row-span-3">
        <Navbar />
      </div>

      <div className="col-span-2">
        <Header title="Characters" />
      </div>

      <div className="col-span-2 col-start-2 row-span-2 row-start-2 overflow-y-scroll bg-home">
        <div className="mx-auto flex flex-col items-center gap-4 py-12">
          <div className="grid grid-cols-4 gap-8">
            {characters.map((character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={handlePreviousPage}
              className="flex items-center justify-center"
            >
              <ChevronLeft className="h-6 w-6 text-zinc-200" />
              Prev page
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              className="flex items-center justify-center"
            >
              Next page
              <ChevronRight className="h-6 w-6 text-zinc-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  CharactersPageProps
> = async (context) => {
  const { query } = context
  const currentPage = parseInt(query.page as string, 10) || 1
  const offset = (currentPage - 1) * 20

  try {
    const charactersData: CharacterDataWrapper = await getCharacters(offset, 20)

    return {
      props: {
        charactersData,
      },
    }
  } catch (error) {
    console.error('Error fetching characters:', error)
    return {
      props: {
        charactersData: { total: 0, results: [] },
      },
    }
  }
}
