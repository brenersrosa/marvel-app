import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

import { Header } from '@/components/global/Header'
import { Card } from '@/components/characters/Card'
import { Input } from '@/components/global/Input'
import { Button } from '@/components/global/Button'
import { Box } from '@/components/global/Box'
import { Loading } from '@/components/global/Loading'
import { OrderBy } from '@/components/characters/OrderBy'
import { AlphabetRuler } from '@/components/characters/AlphabetRuler'
import { Switch } from '@/components/global/Switch'

import { api } from '@/lib/axios'

import { getCharacters, searchCharacters } from '@/utils/marvel'

import { Character, CharacterDataWrapper } from '@/types/marvel'

import { useToast } from '@/contexts/ToastContext'

interface CharactersPageProps {
  charactersData: CharacterDataWrapper
}

interface favoriteCharacterProps {
  character_id: string
}

export default function Characters({ charactersData }: CharactersPageProps) {
  const session = useSession()

  const router = useRouter()

  const { showToast } = useToast()

  const { query } = router
  const currentPage = parseInt(query.page as string, 10) || 1

  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Character[]>([])

  const [isActive, setIsActive] = useState<'active' | 'inactive'>('inactive')
  const [orderBy, setOrderBy] = useState<'name' | '-name'>('name')

  const [isLoading, setIsLoading] = useState(false)

  const [favoriteCharacters, setFavoriteCharacters] = useState<
    favoriteCharacterProps[]
  >([])

  useEffect(() => {
    setCharacters(charactersData.results)
    setTotalPages(Math.ceil(charactersData.total / 20))
  }, [charactersData])

  useEffect(() => {
    async function fetchFavoriteCharacters() {
      try {
        const response = await api.get(
          `/characters/get-favorite-characters?userId=${session.data?.user.id}`,
        )
        setFavoriteCharacters(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (session.data?.user) {
      fetchFavoriteCharacters()
    }
  }, [session.data?.user, favoriteCharacters])

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
    <div className="flex h-screen w-full flex-col bg-zinc-600">
      <div className="w-full">
        <Header
          title="Characters"
          name={session.data?.user.name}
          avatarUrl={session.data?.user.avatar_url}
        />
      </div>

      <div className="h-full overflow-y-scroll bg-home">
        <div className="mx-auto flex flex-col items-center gap-4 px-2 py-6 md:px-6 lg:px-12 xl:px-24">
          <Box className="flex w-full flex-col items-end gap-8 lg:flex-row lg:items-center lg:justify-between">
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

            <Switch isActive={isActive} onIsActiveChange={setIsActive} />

            <OrderBy onSortChange={handleSortChange} orderBy={orderBy} />
          </Box>

          <div className="w-full">
            <AlphabetRuler onClick={(letter) => handleLetterSelected(letter)} />
          </div>

          <div className="h-full w-full items-center justify-end"></div>
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loading />
            </div>
          ) : isActive === 'active' ? (
            <div className="grid min-h-full grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.length > 0
                ? searchResults.map((character) => {
                    const isCharacterFavorite = favoriteCharacters.some(
                      (fav) => fav.character_id === String(character.id),
                    )
                    if (isCharacterFavorite) {
                      return (
                        <Card
                          key={character.id}
                          character={character}
                          isFavorite={isCharacterFavorite}
                        />
                      )
                    }
                    return null
                  })
                : characters.map((character) => {
                    const isCharacterFavorite = favoriteCharacters.some(
                      (fav) => fav.character_id === String(character.id),
                    )
                    if (isCharacterFavorite) {
                      return (
                        <Card
                          key={character.id}
                          character={character}
                          isFavorite={isCharacterFavorite}
                        />
                      )
                    }
                    return null
                  })}
            </div>
          ) : (
            <div className="grid min-h-full grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.length > 0
                ? searchResults.map((character) => {
                    const isCharacterFavorite = favoriteCharacters.some(
                      (fav) => fav.character_id === String(character.id),
                    )
                    return (
                      <Card
                        key={character.id}
                        character={character}
                        isFavorite={isCharacterFavorite}
                      />
                    )
                  })
                : characters.map((character) => {
                    const isCharacterFavorite = favoriteCharacters.some(
                      (fav) => fav.character_id === String(character.id),
                    )
                    return (
                      <Card
                        key={character.id}
                        character={character}
                        isFavorite={isCharacterFavorite}
                      />
                    )
                  })}
            </div>
          )}

          {!isLoading && isActive === 'inactive' && (
            <div className="flex h-full items-center justify-between gap-4">
              <button
                onClick={handlePreviousPage}
                className="flex items-center justify-center"
              >
                <ChevronLeft className="h-6 w-6 text-zinc-200" />
                <span className="hidden md:inline">Prev page</span>
              </button>

              <span className="">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                className="flex items-center justify-center"
              >
                <span className="hidden md:inline">Next page</span>
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
  try {
    const { query } = context
    const currentPage = parseInt(query.page as string, 10) || 1
    const offset = (currentPage - 1) * 20

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

    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return {
      props: {
        charactersData,
        session,
      },
    }
  } catch (error) {
    console.error('Error fetching characters:', error)
    return {
      props: {
        charactersData: { total: 0, results: [] } as CharacterDataWrapper,
        session: null,
      },
    }
  }
}
