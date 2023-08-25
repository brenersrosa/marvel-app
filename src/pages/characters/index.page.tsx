import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

import { Header } from '@/components/global/Header'
import { Navbar } from '@/components/global/Navbar'
import { Card } from '@/components/characters/Card'
import { Input } from '@/components/global/Input'
import { Button } from '@/components/global/Button'
import { Box } from '@/components/global/Box'

import { getCharacters, searchCharacters } from '@/utils/marvel'

import { Character, CharacterDataWrapper } from '@/types/marvel'

import { useToast } from '@/contexts/ToastContext'
import { Loading } from '@/components/global/Loading'
import { OrderBy } from '@/components/characters/OrderBy'

interface CharactersPageProps {
  charactersData: CharacterDataWrapper
}

export default function Characters({ charactersData }: CharactersPageProps) {
  const router = useRouter()

  const { showToast } = useToast()

  const { query } = router
  const currentPage = parseInt(query.page as string, 10) || 1

  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Character[]>([])

  const [isLoading, setIsLoading] = useState(false)

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

  async function handleSearch() {
    try {
      setIsLoading(true)
      const charactersData = await searchCharacters(searchTerm)
      setSearchResults(charactersData.results)

      if (charactersData.results.length === 0) {
        showToast('Error!', 'Character not found.', 'error')
      }
    } catch (error) {
      console.error('Error searching characters:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSortChange(value: string) {
    try {
      setIsLoading(true)
      const newCharactersData = await getCharacters(
        (currentPage - 1) * 20,
        20,
        value,
      )
      setCharacters(newCharactersData.results)
      setTotalPages(Math.ceil(newCharactersData.total / 20))
    } catch (error) {
      console.error('Error fetching characters:', error)
      setCharacters([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }

  async function clearSearchInput() {
    try {
      setSearchTerm('')
      setIsLoading(true)
      const charactersData = await getCharacters(1, 20, 'name')
      setSearchResults([])
      setCharacters(charactersData.results)
    } catch (error) {
      console.error('Error searching characters:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
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
        <div className="mx-auto flex h-full max-w-[1400px] flex-col items-center gap-8 py-12">
          <Box className="flex w-full items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search character by name"
                onClear={clearSearchInput}
              />
              <Button icon={<Search />} onClick={handleSearch} type="submit" />
            </div>

            <OrderBy onSortChange={handleSortChange} />
          </Box>

          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-8">
              {searchResults.length > 0
                ? searchResults.map((character) => (
                    <Card key={character.id} character={character} />
                  ))
                : characters.map((character) => (
                    <Card key={character.id} character={character} />
                  ))}
            </div>
          )}

          {searchResults.length === 0 && !isLoading && (
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
          )}
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
    const charactersData: CharacterDataWrapper = await getCharacters(
      offset,
      20,
      'name',
    )

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
