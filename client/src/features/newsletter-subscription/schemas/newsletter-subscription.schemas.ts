import z from 'zod'
import { emailSchema } from '@shared/form'

export const newsletterSubscriptionSchema = z.object({
  email: emailSchema,
})
