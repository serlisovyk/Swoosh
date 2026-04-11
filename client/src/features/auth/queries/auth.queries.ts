'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useSetFavoriteProductIds } from '@features/favorites'
import { API_QUERY_KEYS, getErrorMessage } from '@shared/api'
import { ROUTES } from '@shared/config'
import { useCaptcha } from '../hooks'
import { authService } from '../services'
import type {
  LoginPayload,
  RegisterPayload,
  RequestPasswordResetDto,
  ResetPasswordDto,
  AuthSessionsResponse,
  GetMeQueryOptions,
  User,
  VerifyEmailDto,
} from '../types'

export function useGetMeQuery(options: GetMeQueryOptions = {}) {
  const { enabled = true } = options

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null>({
    queryKey: [API_QUERY_KEYS.ME],
    queryFn: () => authService.getMe(),
    enabled,
    retry: false,
  })

  return { user, isLoading, error }
}

export function useSessionsQuery() {
  const {
    data,
    error,
    isLoading,
  } = useQuery<AuthSessionsResponse>({
    queryKey: [API_QUERY_KEYS.AUTH_SESSIONS],
    queryFn: () => authService.getSessions(),
    retry: false,
  })

  return {
    sessions: data?.sessions ?? [],
    isLoading,
    error,
  }
}

export function useLoginMutation() {
  const router = useRouter()

  const queryClient = useQueryClient()

  const setFavoriteProductIds = useSetFavoriteProductIds()

  const { resetCaptcha, validateCaptcha, getCaptchaHeader } = useCaptcha()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: LoginPayload) =>
      authService.login(dto, { headers: getCaptchaHeader() }),
    onSuccess: ({ user }) => {
      setFavoriteProductIds(user.favoriteProductIds)
      queryClient.setQueryData([API_QUERY_KEYS.ME], user)
      toast.success('Вы успешно вошли в систему!')
      router.replace(ROUTES.PROFILE)
    },
    onError: (error: unknown) => {
      resetCaptcha()

      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  const login = async (dto: LoginPayload) => {
    if (!validateCaptcha()) return

    await mutateAsync(dto)
  }

  return { login, isLoading: isPending }
}

export function useRegisterMutation() {
  const router = useRouter()

  const queryClient = useQueryClient()

  const setFavoriteProductIds = useSetFavoriteProductIds()

  const { resetCaptcha, validateCaptcha, getCaptchaHeader } = useCaptcha()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: RegisterPayload) =>
      authService.register(dto, { headers: getCaptchaHeader() }),
    onSuccess: ({ user }) => {
      setFavoriteProductIds(user.favoriteProductIds)
      queryClient.setQueryData([API_QUERY_KEYS.ME], user)
      toast.success('Регистрация прошла успешно!')
      router.replace(ROUTES.PROFILE)
    },
    onError: (error: unknown) => {
      resetCaptcha()

      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  const register = async (dto: RegisterPayload) => {
    if (!validateCaptcha()) return

    await mutateAsync(dto)
  }

  return { register, isLoading: isPending }
}

export function useLogoutMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData<User | null>([API_QUERY_KEYS.ME], null)
      queryClient.removeQueries({ queryKey: [API_QUERY_KEYS.AUTH_SESSIONS] })
      toast.success('Вы успешно вышли из системы!')
      router.replace(ROUTES.HOME)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { logout: mutateAsync, isLoading: isPending }
}

export function useLogoutAllMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => authService.logoutAll(),
    onSuccess: () => {
      queryClient.setQueryData<User | null>([API_QUERY_KEYS.ME], null)
      queryClient.removeQueries({ queryKey: [API_QUERY_KEYS.AUTH_SESSIONS] })
      toast.success('Вы успешно вышли из системы!')
      router.replace(ROUTES.HOME)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { logoutAll: mutateAsync, isLoading: isPending }
}

export function useRevokeSessionMutation() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (sessionId: string) => authService.revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEYS.AUTH_SESSIONS] })
      toast.success('Сессия завершена.')
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { revokeSession: mutateAsync, isLoading: isPending }
}

export function useRequestPasswordResetMutation() {
  const { resetCaptcha, validateCaptcha, getCaptchaHeader } = useCaptcha()

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: (dto: RequestPasswordResetDto) =>
      authService.requestPasswordResetWithConfig(dto, {
        headers: getCaptchaHeader(),
      }),
    onSuccess: () => {
      toast.success('Ссылка для восстановления отправлена на почту')
    },
    onError: (error: unknown) => {
      resetCaptcha()

      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  const requestPasswordReset = async (dto: RequestPasswordResetDto) => {
    if (!validateCaptcha()) return

    await mutateAsync(dto)
  }

  return {
    requestPasswordReset,
    isLoading: isPending,
    isSuccess,
  }
}

export function useResetPasswordMutation() {
  const router = useRouter()
  const { resetCaptcha, validateCaptcha, getCaptchaHeader } = useCaptcha()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (dto: ResetPasswordDto) =>
      authService.resetPassword(dto, { headers: getCaptchaHeader() }),
    onSuccess: () => {
      toast.success('Пароль успешно изменен!')
      router.replace(ROUTES.LOGIN)
    },
    onError: (error: unknown) => {
      resetCaptcha()

      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  const resetPassword = async (dto: ResetPasswordDto) => {
    if (!validateCaptcha()) return

    await mutateAsync(dto)
  }

  return { resetPassword, isLoading: isPending }
}

export function useRequestEmailVerificationMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => authService.requestEmailVerification(),
    onSuccess: () => {
      toast.success('Письмо для подтверждения почты отправлено повторно.')
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return { requestEmailVerification: mutateAsync, isLoading: isPending }
}

export function useVerifyEmailMutation() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: (dto: VerifyEmailDto) => authService.verifyEmail(dto),
    onSuccess: () => {
      queryClient.setQueryData<User | null>(
        [API_QUERY_KEYS.ME],
        (currentUser) =>
          currentUser ? { ...currentUser, isEmailVerified: true } : currentUser,
      )

      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEYS.ME] })
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return {
    verifyEmail: mutateAsync,
    isLoading: isPending,
    isSuccess,
    error,
  }
}
