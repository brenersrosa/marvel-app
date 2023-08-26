import { ReactNode, createContext, useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface UserProps {
  id: string
  name: string
  email: string
  avatarUrl: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  loading: boolean
  user: UserProps | null
  error: string | null
  handleSignIn: () => void
  handleSignOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const isAuthenticated = !!user
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    const userData = session.data?.user

    if (userData) {
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatarUrl: userData.avatar_url,
      })
    }

    setLoading(false)
  }, [session])

  async function handleSignIn() {
    try {
      setLoading(true)
      await signIn('google')
      await router.push('/characters')
    } catch (err) {
      setError('Failed to sign in.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true)
      await signOut()
      setUser(null)
      await router.push('/')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        error,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
