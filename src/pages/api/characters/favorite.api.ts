import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { userId, characterId } = req.body

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const existingFavorite = await prisma.favoriteCharacter.findFirst({
        where: {
          user_id: userId,
          character_id: characterId,
        },
      })

      if (existingFavorite) {
        await prisma.favoriteCharacter.delete({
          where: {
            id: existingFavorite.id,
          },
        })
        return res
          .status(200)
          .json({ message: 'Character removed from favorites' })
      } else {
        await prisma.favoriteCharacter.create({
          data: {
            user: { connect: { id: userId } },
            character_id: characterId,
          },
        })
        return res.status(200).json({ message: 'Character added to favorites' })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
