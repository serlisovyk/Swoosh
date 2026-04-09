'use client'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { getErrorMessage } from '@shared/api'
import { newsletterSubscriptionService } from '../services'
import type { CreateNewsletterSubscriptionPayload } from '../types'

export function useCreateNewsletterSubscriptionMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateNewsletterSubscriptionPayload) =>
      newsletterSubscriptionService.createNewsletterSubscription(payload),
    onSuccess: () => {
      toast.success('Вы успешно подписались на рассылку!')
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return {
    createNewsletterSubscription: mutateAsync,
    isLoading: isPending,
  }
}
