import { useContext } from 'react'
import Image from 'next/image'
import { GoogleLogo } from 'phosphor-react'

import { AuthContext } from '@/contexts/AuthContext'

import heroImage from '@/assets/hero-iron-man.png'
import marvelLogo from '@/assets/marvel-logo.svg'

export default function Home() {
  const { handleSignIn } = useContext(AuthContext)

  return (
    <div className="h-screen w-screen bg-home bg-cover bg-no-repeat">
      <div className="w-full px-8 md:mx-auto md:flex md:h-full md:w-full md:max-w-7xl md:items-center md:gap-20 md:px-0">
        <div className="flex max-w-2xl flex-1 flex-col gap-6">
          <Image src={marvelLogo} height={48} alt="Marvel logo." />

          <h1 className="font-title text-6xl leading-tight text-white">
            Seus personagens e criações favoritas
          </h1>

          <span className="text-xl font-light leading-relaxed text-zinc-200">
            Conheça todo ecossistema Marvel! Conheça as obras, personagens,
            quadrinhos, filmes e séries.
          </span>

          <button
            onClick={handleSignIn}
            className="flex items-center justify-center gap-2 rounded bg-red-600 px-8 py-3 font-medium transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-500"
          >
            <GoogleLogo className="h-6 w-6" />
            Entrar com o Google
          </button>
        </div>

        <div className="hidden lg:flex">
          <Image
            src={heroImage}
            height={1100}
            quality={100}
            priority
            alt="Iron Man hero image."
            className="absolute bottom-0 right-0 max-h-full max-w-full"
          />
        </div>
      </div>
    </div>
  )
}
