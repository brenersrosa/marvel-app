export interface Comic {
  id: string
  title: string
  description: string
  pageCount: number
  thumbnail: {
    path: string
    extension: string
  }
}

export interface ComicDataWrapper {
  results: Comic[]
}

export interface Serie {
  id: string
  title: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface SerieDataWrapper {
  results: Serie[]
}
export interface Character {
  id: string
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: Comic[]
}

export interface CharacterDataWrapper {
  results: Character[]
  total: number
}
