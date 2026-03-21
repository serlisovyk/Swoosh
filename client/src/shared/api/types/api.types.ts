import { InternalAxiosRequestConfig } from 'axios'

export interface ApiErrorResponse {
  message: string | string[]
}

export interface ApiInterceptorOriginalRequest extends InternalAxiosRequestConfig {
  isRetry?: boolean
}
