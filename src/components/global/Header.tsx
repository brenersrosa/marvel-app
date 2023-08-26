import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { CaretLeft, SignOut } from 'phosphor-react'
import Image from 'next/image'
import { AuthContext } from '@/contexts/AuthContext'

interface FormHeaderProps {
  title: string
}

export function Header({ title }: FormHeaderProps) {
  const session = useSession()

  const router = useRouter()

  const { user, handleSignOut } = useContext(AuthContext)

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
    <div className="flex h-20 w-full items-center justify-between bg-zinc-900 px-20">
      <div className="flex h-full flex-1 items-center justify-between ">
        {isButtonEnabled === true && (
          <button
            onClick={() => router.back()}
            className="rounded bg-red-600 p-4 text-zinc-200 transition-colors hover:bg-red-700"
          >
            <CaretLeft className="h-6 w-6" />
          </button>
        )}
        <span className="font-title text-xl font-semibold">{title}</span>
        {!session.data ? (
          <span className="font-medium">Entrar</span>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <span className="font-medium">{session.data?.user?.name}</span>
              <Image
                src={user?.avatarUrl || ''}
                alt={user?.name || 'Profile image.'}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
            </div>
            <button onClick={handleSignOut}>
              <SignOut size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
