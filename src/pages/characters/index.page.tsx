import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Header } from '@/components/global/Header'
import { Navbar } from '@/components/global/Navbar'
import { Card } from '@/components/characters/Card'

import { getCharacters } from '@/utils/marvel'

import { Character, CharacterDataWrapper } from '@/types/marvel'

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchData() {
      try {
        const charactersData: CharacterDataWrapper = await getCharacters(
          offset,
          20,
        )
        setCharacters(charactersData.results)

        setTotalPages(Math.ceil(charactersData.total / 20))
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }

    fetchData()
  }, [offset])

  function handleNextPage() {
    if (currentPage < totalPages) {
      setOffset(offset + 20)
      setCurrentPage(currentPage + 1)
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setOffset(offset - 20)
      setCurrentPage(currentPage - 1)
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
