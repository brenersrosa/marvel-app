import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CaretLeft, SignOut } from 'phosphor-react'

import { Button } from './Button'

interface FormHeaderProps {
  title: string
}

export function Header({ title }: FormHeaderProps) {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const currentPath = window.location.pathname
    const pathLevels = currentPath.split('/')

    if (pathLevels.length > 2) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [])

  function handleSignOut() {
    // signOut()
  }

  const user = {
    name: 'Brener Rosa',
  }

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
        {!user ? (
          <span className="font-medium">Entrar</span>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-medium">{user.name}</span>
            <button onClick={handleSignOut}>
              <SignOut size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
