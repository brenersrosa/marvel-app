import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { userId } = req.query

  try {
    const favoriteCharacters = await prisma.favoriteCharacter.findMany({
      where: {
        user_id: userId as string,
      },
      include: {
        user: true,
      },
    })

    return res.status(200).json(favoriteCharacters)
  } catch (error) {
    console.error('Error fetching favorite characters:', error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}
