'use client'

import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@shared/api'
import { createIndividualOrder } from '../services'

export function useCreateIndividualOrderMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIndividualOrder,
    onSuccess: () => {
      toast.success('Заявка успешно отправлена!')
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
    },
  })

  return { createIndividualOrder: mutateAsync, isLoading: isPending }
}
