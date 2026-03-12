import { useSearchParams } from 'next/navigation'
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
