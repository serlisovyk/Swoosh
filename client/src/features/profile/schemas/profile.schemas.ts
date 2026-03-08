import z from 'zod'
import { emailSchema, nameSchema, phoneSchema } from '@shared/form'

export const profileEditSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  phone: phoneSchema,
})
