'use client'

import { useSearchParams } from 'next/navigation'
import { useContext } from 'react'
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
