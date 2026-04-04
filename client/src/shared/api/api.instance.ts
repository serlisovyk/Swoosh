import axios from 'axios'
import { API_URL } from '@shared/env'
import { setupApiInterceptors } from './api.interceptors'

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

setupApiInterceptors(API)
