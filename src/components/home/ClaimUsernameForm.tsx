import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '../global/Input'
import { Button } from '../global/Button'
import { Box } from '../global/Box'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    console.log(username)
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handleClaimUsername)}
      className="grid grid-cols-[1fr_auto]"
    >
      <Input
        prefix="marvelapp.com/"
        placeholder="seu-usuario"
        {...register('username')}
        message="Informe o seu nome de usuário."
        error={errors.username}
        info
        autoFocus
      />

      <Button
        title="Reservar"
        icon={<ArrowRight size={20} />}
        disabled={isSubmitting}
      />
    </Box>
  )
}
