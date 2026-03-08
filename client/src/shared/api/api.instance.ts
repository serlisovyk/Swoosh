import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_ROUTES, API_URL } from './config'

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

let refreshPromise: Promise<void> | null = null

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
})

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean
        })
      | null

    const status = error.response?.status
    const url = original?.url ?? ''

    const isAuthRequest =
      url.includes(API_ROUTES.LOGIN) || url.includes(API_ROUTES.REGISTER)

    if (!original) throw error

    if (
      status !== 401 ||
      original._retry ||
      url.includes(API_ROUTES.REFRESH) ||
      isAuthRequest
    ) {
      throw error
    }

    original._retry = true

    if (!refreshPromise) {
      refreshPromise = API.post(API_ROUTES.REFRESH)
        .then(() => undefined)
        .finally(() => (refreshPromise = null))
    }

    try {
      await refreshPromise
      return API.request(original)
    } catch (error) {
      throw error
    }
  },
)
