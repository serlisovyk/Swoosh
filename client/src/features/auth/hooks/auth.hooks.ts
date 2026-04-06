'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { ROUTES } from '@shared/config'
import { SOCIAL_AUTH_STATUS } from '../constants'
import { CaptchaContext } from '../context'
import { useGetMeQuery } from '../queries'
import {
  emailVerificationTokenSchema,
  resetPasswordTokenSchema,
} from '../schemas'
import { ROLE } from '../types'

export function useParseResetPasswordToken() {
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const {
    data: tokenData,
    success: tokenSuccess,
    error: tokenError,
  } = resetPasswordTokenSchema.safeParse(token)

  return { token: tokenData, tokenSuccess, tokenError }
}

export function useParseEmailVerificationToken() {
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const {
    data: tokenData,
    success: tokenSuccess,
    error: tokenError,
  } = emailVerificationTokenSchema.safeParse(token)

  return { token: tokenData, tokenSuccess, tokenError }
}

export function useCaptcha() {
  const context = useContext(CaptchaContext)

  if (!context) {
    throw new Error('useCaptcha must be used within CaptchaProvider')
  }

  return context
}

export function useSocialAuth() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const status = searchParams.get('status')

  const isSuccessState = status === SOCIAL_AUTH_STATUS.SUCCESS

  const query = useGetMeQuery({ enabled: isSuccessState })

  useEffect(() => {
    if (!isSuccessState || !query.user) return

    router.replace(ROUTES.PROFILE)
  }, [isSuccessState, query.user, router])

  return {
    isSuccessState,
    isLoading: isSuccessState && query.isLoading,
    isErrorState: !isSuccessState || Boolean(query.error),
  }
}

export function useProfile() {
  const query = useGetMeQuery()

  const isLoggedIn = Boolean(query.user)

  const isAdmin = query.user?.role === ROLE.ADMIN

  const isEmailVerified = Boolean(query.user?.isEmailVerified)

  const requiresEmailVerification = isLoggedIn && !isEmailVerified

  return {
    ...query,
    isLoggedIn,
    isAdmin,
    isEmailVerified,
    requiresEmailVerification,
  }
}
