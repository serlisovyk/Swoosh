'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useSetFavoriteProductIds } from '@features/favorites'
import { API_QUERY_KEYS, getErrorMessage } from '@shared/api'
import { ROUTES } from '@shared/config'
import { authService } from '../services'
import type {
  LoginPayload,
  RegisterPayload,
  RequestPasswordResetDto,
  ResetPasswordDto,
  User,
} from '../types'

export function useGetMeQuery() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User>({
    queryKey: [API_QUERY_KEYS.ME],
    queryFn: () => authService.getMe(),
    retry: false,
  })

  return { user, isLoading, error }
}

export function useLoginMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const setFavoriteProductIds = useSetFavoriteProductIds()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: LoginPayload) => authService.login(dto),
    onSuccess: ({ user }) => {
      setFavoriteProductIds(user.favoriteProductIds)
      queryClient.setQueryData([API_QUERY_KEYS.ME], user)
      toast.success('Вы успешно вошли в систему!')
      router.replace(ROUTES.PROFILE)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { login: mutateAsync, isLoading: isPending }
}

export function useRegisterMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const setFavoriteProductIds = useSetFavoriteProductIds()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: RegisterPayload) => authService.register(dto),
    onSuccess: ({ user }) => {
      setFavoriteProductIds(user.favoriteProductIds)
      queryClient.setQueryData([API_QUERY_KEYS.ME], user)
      toast.success('Регистрация прошла успешно!')
      router.replace(ROUTES.PROFILE)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { register: mutateAsync, isLoading: isPending }
}

export function useLogoutMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [API_QUERY_KEYS.ME] })
      queryClient.clear()
      toast.success('Вы успешно вышли из системы!')
      router.replace(ROUTES.HOME)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { logout: mutateAsync, isLoading: isPending }
}

export function useRequestPasswordResetMutation() {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: (dto: RequestPasswordResetDto) =>
      authService.requestPasswordReset(dto),
    onSuccess: () => {
      toast.success('Ссылка для восстановления отправлена на почту')
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return {
    requestPasswordReset: mutateAsync,
    isLoading: isPending,
    isSuccess,
  }
}

export function useResetPasswordMutation() {
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: ResetPasswordDto) => authService.resetPassword(dto),
    onSuccess: () => {
      toast.success('Пароль успешно изменен!')
      router.replace(ROUTES.LOGIN)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { resetPassword: mutateAsync, isLoading: isPending }
}
