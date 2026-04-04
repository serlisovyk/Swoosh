import { useSearchParams } from 'next/navigation'
import { useContext } from 'react'
import { CaptchaContext } from '../context'
import { useGetMeQuery } from '../queries'
import { resetPasswordTokenSchema } from '../schemas'
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

export function useCaptcha() {
  const context = useContext(CaptchaContext)

  if (!context) {
    throw new Error('useCaptcha must be used within CaptchaProvider')
  }

  return context
}

export function useProfile() {
  const query = useGetMeQuery()

  return {
    ...query,
    isLoggedIn: Boolean(query.user),
    isAdmin: query.user?.role === ROLE.ADMIN,
  }
}
