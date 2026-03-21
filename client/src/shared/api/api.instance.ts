import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_ROUTES, API_URL } from './config'
import { ApiInterceptorOriginalRequest } from './types'

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

let refreshPromise: Promise<void> | null = null

// TODO: move interceptors to separate file
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
})

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ApiInterceptorOriginalRequest | null

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
      refreshPromise = API.post(API_ROUTES.REFRESH)
        .then(() => undefined)
        .finally(() => (refreshPromise = null))
    }

    try {
      await refreshPromise
      return API.request(originalRequest)
    } catch (error) {
      throw error
    }
  },
)
