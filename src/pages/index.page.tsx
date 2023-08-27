import Image from 'next/image'
import { GoogleLogo } from 'phosphor-react'

import heroImage from '@/assets/hero-iron-man.png'
import marvelLogo from '@/assets/marvel-logo.svg'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GetServerSideProps } from 'next'

export default function Home() {
  const router = useRouter()

  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/characters')
    }
  }, [session, router])

  async function handleSignIn() {
    await signIn('google')

    // try {
    //   await router.push('/characters')
    //   console.log('ok')
    // } catch (error) {
    //   console.error('Error navigating:', error)
    // }
  }

  return (
    <div className="h-screen w-screen bg-home bg-cover bg-no-repeat">
      <div className="flex h-full w-full flex-col items-center p-8 lg:mx-auto lg:flex lg:h-full lg:w-full lg:max-w-7xl lg:flex-row lg:items-center lg:gap-20 lg:px-0">
        <div className="flex max-w-2xl flex-1 flex-col justify-center gap-6">
          <Image src={marvelLogo} height={48} alt="Marvel logo." />

          <h1 className="font-title text-4xl leading-tight text-white lg:text-6xl">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/characters',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session: null,
    },
  }
}
