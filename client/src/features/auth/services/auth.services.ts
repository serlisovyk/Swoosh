import type { AxiosRequestConfig } from 'axios'
import { API_ROUTES, BaseService } from '@shared/api'
import type {
  AuthResponse,
  LoginPayload,
  RequestPasswordResetDto,
  RegisterPayload,
  ResetPasswordDto,
  User,
} from '../types'

class AuthService extends BaseService {
  async login(
    dto: LoginPayload,
    config?: AxiosRequestConfig,
  ): Promise<AuthResponse> {
    return this.post(API_ROUTES.LOGIN, dto, config)
  }

  async register(
    dto: RegisterPayload,
    config?: AxiosRequestConfig,
  ): Promise<AuthResponse> {
    return this.post(API_ROUTES.REGISTER, dto, config)
  }

  async logout(): Promise<boolean> {
    return this.post(API_ROUTES.LOGOUT)
  }

  async getMe(): Promise<User> {
    return this.get(API_ROUTES.PROFILE)
  }

  async requestPasswordResetWithConfig(
    dto: RequestPasswordResetDto,
    config?: AxiosRequestConfig,
  ): Promise<boolean> {
    return this.post(API_ROUTES.REQUEST_PASSWORD_RESET, dto, config)
  }

  async resetPassword(
    dto: ResetPasswordDto,
    config?: AxiosRequestConfig,
  ): Promise<boolean> {
    return this.post(API_ROUTES.RESET_PASSWORD, dto, config)
  }
}

export const authService = new AuthService()
