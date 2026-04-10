import z from 'zod'
import { emailSchema, nameSchema } from '@shared/form'

const messageSchema = z
  .string({ message: 'Текст вопроса должен быть строкой' })
  .trim()
  .max(1000, {
    message: 'Текст вопроса не должен быть длиннее 1000 символов',
  })

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
})
