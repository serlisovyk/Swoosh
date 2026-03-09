'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { API_QUERY_KEYS, getErrorMessage, API_ROUTES } from '@shared/api'
import { updateProfile } from '../services'
import { UpdateProfileDto, UseUpdateProfileMutationOptions } from '../types'

export function useUpdateProfileMutation({
  toastMessage,
  route = API_ROUTES.PROFILE,
}: UseUpdateProfileMutationOptions) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: UpdateProfileDto) => updateProfile(dto),
    onSuccess: () => {
      if (toastMessage) toast.success(toastMessage)
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEYS.ME] })
      router.replace(route)
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
    },
  })

  return { updateProfile: mutateAsync, isLoading: isPending }
}
