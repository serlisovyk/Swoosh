import { useSearchParams } from 'next/navigation'
import { useContext } from 'react'
import { CaptchaContext } from '../context'
import { resetPasswordTokenSchema } from '../schemas'

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
