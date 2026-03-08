import { AxiosError } from 'axios'
import { ApiErrorResponse } from '../types'

export function getErrorMessage(error: AxiosError<ApiErrorResponse>): string {
  const message = error?.response?.data?.message

  if (typeof message === 'string') return message
  if (Array.isArray(message)) return message[0]

  return 'Произошла ошибка при выполнении запроса.'
}
