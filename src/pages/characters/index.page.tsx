import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

import { Header } from '@/components/global/Header'
import { Navbar } from '@/components/global/Navbar'
import { Card } from '@/components/characters/Card'
import { Input } from '@/components/global/Input'
import { Button } from '@/components/global/Button'
import { Box } from '@/components/global/Box'
import { Loading } from '@/components/global/Loading'
import { OrderBy } from '@/components/characters/OrderBy'
import { AlphabetRuler } from '@/components/characters/AlphabetRuler'

import { getCharacters, searchCharacters } from '@/utils/marvel'

import { Character, CharacterDataWrapper } from '@/types/marvel'

import { useToast } from '@/contexts/ToastContext'

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

  const [orderBy, setOrderBy] = useState<'name' | '-name'>('name')

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCharacters(charactersData.results)
    setTotalPages(Math.ceil(charactersData.total / 20))
  }, [charactersData])

  function handleNextPage() {
    const nextPage = currentPage + 1

    if (nextPage <= totalPages) {
      router.push({
        query: {
          page: nextPage.toString(),
          letter: query.letter,
        },
      })
    }
  }

  function handlePreviousPage() {
    const prevPage = currentPage - 1

    if (prevPage >= 1) {
      router.push({
        query: {
          page: prevPage.toString(),
          letter: query.letter,
        },
      })
    }
  }

  async function handleSearch() {
    try {
      const currentPage = parseInt(query.page as string, 10) || 1
      const offset = (currentPage - 1) * 20
      const charactersData = await searchCharacters(
        searchTerm,
        offset,
        20,
        orderBy,
      )
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
      const currentPage = parseInt(query.page as string, 10) || 1
      const offset = (currentPage - 1) * 20

      let charactersData

      if (Array.isArray(query.letter)) {
        charactersData = await searchCharacters(
          query.letter[0],
          offset,
          20,
          value,
        )
      } else if (query.letter && query.letter !== 'all') {
        charactersData = await searchCharacters(query.letter, offset, 20, value)
      } else {
        charactersData = await getCharacters(offset, 20, value)
      }

      setCharacters(charactersData.results)
      setTotalPages(Math.ceil(charactersData.total / 20))
      setOrderBy(value as 'name' | '-name')
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

  async function handleLetterSelected(letter: string) {
    try {
      setOrderBy(orderBy === 'name' ? '-name' : 'name')
      router.push({ query: { page: 1, letter, orderBy } })
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
              <Button icon={<Search />} onClick={handleSearch} />
            </div>

            <OrderBy onSortChange={handleSortChange} orderBy={orderBy} />
          </Box>

          <div className="w-full">
            <AlphabetRuler onClick={(letter) => handleLetterSelected(letter)} />
          </div>

          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-8 py-8">
              {searchResults.length > 0
                ? searchResults.map((character) => (
                    <Card key={character.id} character={character} />
                  ))
                : characters.map((character) => (
                    <Card key={character.id} character={character} />
                  ))}
            </div>
          )}

          {!isLoading && (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const currentPage = parseInt(query.page as string, 10) || 1
  const offset = (currentPage - 1) * 20

  try {
    let charactersData

    const letter = query.letter as string

    if (letter && letter !== 'all' && letter !== '0-9') {
      charactersData = await searchCharacters(letter, offset, 20, 'name')
    } else if (letter === 'all') {
      charactersData = await getCharacters(offset, 20, 'name')
    } else if (letter === '0-9') {
      charactersData = await searchCharacters('3', offset, 20, 'name')
    } else {
      charactersData = await getCharacters(offset, 20, 'name')
    }

    return {
      props: {
        charactersData,
      },
    }
  } catch (error) {
    console.error('Error fetching characters:', error)
    return {
      props: {
        charactersData: { total: 0, results: [] } as CharacterDataWrapper,
      },
    }
  }
}
