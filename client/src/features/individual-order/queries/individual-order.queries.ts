'use client'

import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { getErrorMessage } from '@shared/api'
import { individualOrderService } from '../services'
import type { CreateIndividualOrderPayload } from '../types'

export function useCreateIndividualOrderMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateIndividualOrderPayload) =>
      individualOrderService.createIndividualOrder(payload),
    onSuccess: () => {
      toast.success('Заявка успешно отправлена!')
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { createIndividualOrder: mutateAsync, isLoading: isPending }
}
