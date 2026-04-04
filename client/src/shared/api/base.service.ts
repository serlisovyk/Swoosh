import type { AxiosRequestConfig } from 'axios'
import { API } from './api.instance'

export class BaseService {
  protected readonly client = API

  protected async get<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const { data } = await this.client.get<TResponse>(url, config)
    return data
  }

  protected async post<TResponse, TPayload = unknown>(
    url: string,
    payload?: TPayload,
  ): Promise<TResponse> {
    const { data } = await this.client.post<TResponse>(url, payload)
    return data
  }

  protected async put<TResponse, TPayload = unknown>(
    url: string,
    payload?: TPayload,
  ): Promise<TResponse> {
    const { data } = await this.client.put<TResponse>(url, payload)
    return data
  }

  protected async delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const { data } = await this.client.delete<TResponse>(url, config)
    return data
  }
}
