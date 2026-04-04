import type { AxiosRequestConfig } from 'axios'
import { API } from './api.instance'

export class BaseService {
  protected readonly client = API

  protected async get<Response>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    const { data } = await this.client.get<Response>(url, config)
    return data
  }

  protected async post<Response, Payload = unknown>(
    url: string,
    payload?: Payload,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    const { data } = await this.client.post<Response>(url, payload, config)
    return data
  }

  protected async put<Response, Payload = unknown>(
    url: string,
    payload?: Payload,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    const { data } = await this.client.put<Response>(url, payload, config)
    return data
  }

  protected async delete<Response>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    const { data } = await this.client.delete<Response>(url, config)
    return data
  }
}
