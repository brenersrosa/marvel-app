import md5 from 'md5'

import { CharacterDataWrapper, ComicDataWrapper } from '@/types/marvel'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const API_PUBLIC_KEY = process.env.NEXT_PUBLIC_API_PUBLIC_KEY
const API_PRIVATE_KEY = process.env.NEXT_PUBLIC_API_PRIVATE_KEY

const getTimeStamp = () => Date.now().toString()
const getHash = (timeStamp: string) =>
  md5(timeStamp + API_PRIVATE_KEY + API_PUBLIC_KEY)

const timeStamp = getTimeStamp()
const hash = getHash(timeStamp)
const query = `ts=${timeStamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`

const handleResponse = async <T>(response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data.data as T
}

export async function getCharacters(
  offset: number,
  limit: number,
  orderBy: string,
): Promise<CharacterDataWrapper> {
  const url = `${API_BASE_URL}/characters?orderBy=${orderBy}&offset=${offset}&limit=${limit}&${query}`
  const response = await fetch(url)
  return handleResponse<CharacterDataWrapper>(response)
}

export async function detailCharacter(
  characterId: string,
): Promise<CharacterDataWrapper> {
  const characterUrl = `${API_BASE_URL}/characters/${characterId}?${query}`
  const comicsUrl = `${API_BASE_URL}/characters/${characterId}/comics?${query}`

  const [characterResponse, comicsResponse] = await Promise.all([
    fetch(characterUrl),
    fetch(comicsUrl),
  ])

  const characterData =
    await handleResponse<CharacterDataWrapper>(characterResponse)
  const comicsData = await handleResponse<ComicDataWrapper>(comicsResponse)

  const characterWithComics = {
    ...characterData,
    results: characterData.results.map((character) => ({
      ...character,
      comics: comicsData.results,
    })),
  }

  return characterWithComics
}

export async function searchCharacters(
  querySearch: string | number | null,
  offset: number,
  limit: number,
  orderBy: string,
): Promise<CharacterDataWrapper> {
  const url = `${API_BASE_URL}/characters?nameStartsWith=${querySearch}&orderBy=${orderBy}&offset=${offset}&limit=${limit}&${query}`
  const response = await fetch(url)
  return handleResponse<CharacterDataWrapper>(response)
}
