import z from 'zod'
import { API_ROUTES } from '@shared/api'
import { TOKEN_REGEX } from '../constants'
import { VERIFY_EMAIL_VIEW_STATE_CONFIG } from '../config/verify-email-view.config'
import {
  type GetVerifyEmailViewStateOptions,
  VERIFY_EMAIL_VIEW_STATUSES,
  type VerifyEmailViewState,
} from '../types'

export function createTokenSchema(message: string) {
  return z.preprocess(
    trimStringValue,
    z.string().min(1, { message }).regex(TOKEN_REGEX, {
      message,
    }),
  )
}

function trimStringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function getSocialAuthUrl(provider: string) {
  return API_ROUTES.SOCIAL_AUTH(provider)
}

export function getVerifyEmailViewState({
  errorDescription,
  isLoading,
  status,
}: GetVerifyEmailViewStateOptions): VerifyEmailViewState {
  const baseState = VERIFY_EMAIL_VIEW_STATE_CONFIG[status]

  return {
    ...baseState,
    description:
      status === VERIFY_EMAIL_VIEW_STATUSES.ERROR
        ? errorDescription
        : baseState.description,
    isLoading: status === VERIFY_EMAIL_VIEW_STATUSES.PENDING && isLoading,
  }
}
