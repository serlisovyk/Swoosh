import z from 'zod'
import { emailSchema, nameSchema, phoneSchema } from '@shared/form'

const messageSchema = z
  .string({ message: 'Сообщение обязательно' })
  .trim()
  .max(1000, { message: 'Сообщение не должно быть длиннее 1000 символов' })

export const individualOrderSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  message: messageSchema,
})
