'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { API_QUERY_KEYS, getErrorMessage } from '@shared/api'
import { ROUTES } from '@shared/config'
import {
  getMe,
  login,
  register,
  logout,
  requestPasswordReset,
  resetPassword,
} from '../services'
import { LoginFormData, RegisterDto, User } from '../types'

export function useGetMeQuery() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User>({
    queryKey: [API_QUERY_KEYS.ME],
    queryFn: getMe,
    retry: false,
  })

  return { user, isLoading, error }
}

export function useLoginMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: LoginFormData) => login(dto),
    onSuccess: ({ user }) => {
      queryClient.setQueryData([API_QUERY_KEYS.ME], user)
      toast.success('Вы успешно вошли в систему!')
      router.replace(ROUTES.PROFILE)
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
    },
  })

  return { login: mutateAsync, isLoading: isPending }
}

export function useRegisterMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: RegisterDto) => register(dto),
    onSuccess: ({ user }) => {
      queryClient.setQueryData([API_QUERY_KEYS.ME], user)
      toast.success('Регистрация прошла успешно!')
      router.replace(ROUTES.PROFILE)
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
    },
  })

  return { register: mutateAsync, isLoading: isPending }
}

export function useLogoutMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [API_QUERY_KEYS.ME] })
      queryClient.clear()
      toast.success('Вы успешно вышли из системы!')
      router.replace(ROUTES.HOME)
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
    },
  })

  return { logout: mutateAsync, isLoading: isPending }
}

export function useRequestPasswordResetMutation() {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success('Ссылка для восстановления отправлена на почту')
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
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
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Пароль успешно изменен!')
      router.replace(ROUTES.LOGIN)
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) toast.error(getErrorMessage(error))
    },
  })

  return { resetPassword: mutateAsync, isLoading: isPending }
}
