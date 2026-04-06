import type { LucideIcon } from 'lucide-react'

export const VERIFY_EMAIL_VIEW_STATUSES = {
  SUCCESS: 'success',
  ERROR: 'error',
  PENDING: 'pending',
} as const

export type VerifyEmailViewStatus =
  (typeof VERIFY_EMAIL_VIEW_STATUSES)[keyof typeof VERIFY_EMAIL_VIEW_STATUSES]

export const VERIFY_EMAIL_LOADING_MESSAGES = {
  IDLE: 'Запускаем проверку...',
  PENDING: 'Подождите немного...',
} as const

export interface VerifyEmailViewState {
  actionHref?: string
  actionLabel?: string
  description: string
  icon: LucideIcon
  isLoading: boolean
  title: string
}

export interface GetVerifyEmailViewStateOptions {
  errorDescription: string
  isLoading: boolean
  status: VerifyEmailViewStatus
}

export type VerifyEmailViewStateConfig = Omit<VerifyEmailViewState, 'isLoading'>
