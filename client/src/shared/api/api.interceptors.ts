import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { API_ROUTES } from './config'
import type { ApiInterceptorOriginalRequest } from './types'

export function setupApiInterceptors(api: AxiosInstance) {
  let refreshPromise: Promise<void> | null = null

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => config)

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest =
        error.config as ApiInterceptorOriginalRequest | null
      const status = error.response?.status
      const url = originalRequest?.url ?? ''

      const isAuthRequest =
        url.includes(API_ROUTES.LOGIN) || url.includes(API_ROUTES.REGISTER)

      if (!originalRequest) throw error

      if (
        status !== 401 ||
        originalRequest.isRetry ||
        url.includes(API_ROUTES.REFRESH) ||
        isAuthRequest
      ) {
        throw error
      }

      originalRequest.isRetry = true

      if (!refreshPromise) {
        refreshPromise = api
          .post(API_ROUTES.REFRESH)
          .then(() => undefined)
          .finally(() => (refreshPromise = null))
      }

      await refreshPromise

      return api.request(originalRequest)
    },
  )
}
