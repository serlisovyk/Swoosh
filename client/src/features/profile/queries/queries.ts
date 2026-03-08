'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { API_QUERY_KEYS, getErrorMessage, API_ROUTES } from '@shared/api'
import { updateProfile } from '../services'
import { ProfileEditFormData } from '../types'

export function useUpdateProfileMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: ProfileEditFormData) => updateProfile(dto),
    onSuccess: () => {
      toast.success('Профиль успешно обновлен!')
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEYS.ME] })
      router.replace(API_ROUTES.PROFILE)
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
    },
  })

  return { updateProfile: mutateAsync, isLoading: isPending }
}
