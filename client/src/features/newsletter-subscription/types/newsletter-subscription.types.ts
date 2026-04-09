import z from 'zod'
import { newsletterSubscriptionSchema } from '../schemas'

export type NewsletterSubscriptionFormValues = z.infer<
  typeof newsletterSubscriptionSchema
>

export type CreateNewsletterSubscriptionPayload =
  NewsletterSubscriptionFormValues

export type CreateNewsletterSubscriptionResponse = boolean
