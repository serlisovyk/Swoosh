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
  async login(dto: LoginPayload): Promise<AuthResponse> {
    return this.post(API_ROUTES.LOGIN, dto)
  }

  async register(dto: RegisterPayload): Promise<AuthResponse> {
    return this.post(API_ROUTES.REGISTER, dto)
  }

  async logout(): Promise<boolean> {
    return this.post(API_ROUTES.LOGOUT)
  }

  async getMe(): Promise<User> {
    return this.get(API_ROUTES.PROFILE)
  }

  async requestPasswordReset(dto: RequestPasswordResetDto): Promise<boolean> {
    return this.post(API_ROUTES.REQUEST_PASSWORD_RESET, dto)
  }

  async resetPassword(dto: ResetPasswordDto): Promise<boolean> {
    return this.post(API_ROUTES.RESET_PASSWORD, dto)
  }
}

export const authService = new AuthService()
