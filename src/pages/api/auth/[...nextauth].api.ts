import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'

export function buildNextAuthOptions(): NextAuthOptions {
  return {
    adapter: PrismaAdapter(),
    providers: [
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
    ],
    jwt: {
      secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    },
    pages: {
      signIn: '/',
    },
    callbacks: {
      // async signIn({ user }) {
      //   console.log(user)

      //   if (user) {
      //     return Promise.resolve('/characters')
      //   }

      //   return Promise.resolve('/')
      // },
      async session({ session, user }) {
        console.log(session)

        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  try {
    await NextAuth(req, res, buildNextAuthOptions())
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during authentication' })
  }
}
