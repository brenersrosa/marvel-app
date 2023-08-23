import Image from 'next/image'
import { GoogleLogo } from 'phosphor-react'

import { Header } from '@/components/global/Header'
import { ClaimUsernameForm } from '@/components/home/ClaimUsernameForm'

import heroImage from '@/assets/hero-iron-man.png'

export default function Home() {
  return (
    <div className="bg-home h-screen w-screen bg-cover bg-no-repeat">
      <Header />

      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-20">
        <div className="flex max-w-2xl flex-1 flex-col gap-6">
          <h1 className="font-title text-6xl leading-tight text-white">
            Seus personagens e criações favoritas
          </h1>

          <span className="text-xl font-light leading-relaxed text-zinc-200">
            Conheça todo ecossistema Marvel! Conheça as obras, personagens,
            quadrinhos, filmes e séries.
          </span>

          <ClaimUsernameForm />

          <div className="flex items-center justify-between gap-4">
            <div className="h-[1px] w-full rounded-full bg-zinc-600"></div>
            <span className="text-sm text-zinc-400">ou</span>
            <div className="h-[1px] w-full rounded-full bg-zinc-600"></div>
          </div>

          <button
            onClick={() => ({})}
            className="flex items-center justify-center gap-2 rounded bg-red-600 px-8 py-3 font-medium transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-500"
          >
            <GoogleLogo className="h-6 w-6" />
            Entrar com o Google
          </button>
        </div>

        <div>
          <Image
            src={heroImage}
            height={1100}
            quality={100}
            priority
            alt="Iron Man hero image."
            className="absolute bottom-0 right-0 max-h-full"
          />
        </div>
      </div>
    </div>
  )
}
