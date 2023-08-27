import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { CaretLeft, SignOut } from 'phosphor-react'

import logo from '@/assets/marvel-logo.svg'

interface FormHeaderProps {
  title: string
  name?: string
  avatarUrl?: string
}

export function Header({ title, name, avatarUrl }: FormHeaderProps) {
  const session = useSession()

  const router = useRouter()

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  useEffect(() => {
    const currentPath = window.location.pathname
    const pathLevels = currentPath.split('/')

    if (pathLevels.length > 2) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-zinc-900 md:flex-row">
      <div className="flex h-20 w-full items-center justify-center bg-red-600 md:w-20">
        <Image src={logo} alt="Marvel logo." className="w-14" />
      </div>

      <div className="flex h-full w-full flex-col-reverse items-start justify-between px-4 py-4 md:flex-row md:items-center md:px-20">
        <div className="flex flex-1 items-center gap-8">
          {isButtonEnabled === true && (
            <button
              onClick={() => router.back()}
              className="rounded bg-red-600 p-4 text-zinc-200 transition-colors hover:bg-red-700"
            >
              <CaretLeft className="h-6 w-6" />
            </button>
          )}
          <span className="line-clamp-1 font-title text-xl font-semibold">
            {title}
          </span>
        </div>

        {!session.data ? (
          <span className="font-medium">Entrar</span>
        ) : (
          <div className="flex w-full items-center justify-between gap-4 md:w-auto">
            <div className="flex w-full items-center justify-start gap-2 md:w-auto">
              <Image
                src={avatarUrl || ''}
                alt={name || 'Profile picture.'}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <span className="font-medium">{name}</span>
            </div>
            <button onClick={() => signOut()}>
              <SignOut size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
