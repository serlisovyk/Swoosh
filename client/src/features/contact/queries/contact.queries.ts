'use client'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { getErrorMessage } from '@shared/api'
import { contactService } from '../services'
import type { CreateContactRequestPayload } from '../types'

export function useCreateContactRequestMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateContactRequestPayload) =>
      contactService.createContactRequest(payload),
    onSuccess: () => {
      toast.success('Сообщение успешно отправлено!')
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return {
    createContactRequest: mutateAsync,
    isLoading: isPending,
  }
}
