'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NEWSLETTER_SUBSCRIPTION_FORM_DEFAULT_VALUES } from '../constants'
import { newsletterSubscriptionSchema } from '../schemas'
import type { NewsletterSubscriptionFormValues } from '../types'

export function useNewsletterSubscriptionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterSubscriptionFormValues>({
    mode: 'onSubmit',
    defaultValues: NEWSLETTER_SUBSCRIPTION_FORM_DEFAULT_VALUES,
    resolver: zodResolver(newsletterSubscriptionSchema),
  })

  return { register, handleSubmit, reset, errors }
}
