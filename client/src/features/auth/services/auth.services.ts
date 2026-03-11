import { API, API_ROUTES } from '@shared/api'
import {
  AuthResponse,
  LoginFormData,
  RequestPasswordResetDto,
  RegisterDto,
  ResetPasswordDto,
  User,
} from '../types'

export async function login(dto: LoginFormData): Promise<AuthResponse> {
  const { data } = await API.post<AuthResponse>(API_ROUTES.LOGIN, dto)
  return data
}

export async function register(dto: RegisterDto): Promise<AuthResponse> {
  const { data } = await API.post<AuthResponse>(API_ROUTES.REGISTER, dto)
  return data
}

export async function logout(): Promise<boolean> {
  const { data } = await API.post<boolean>(API_ROUTES.LOGOUT)
  return data
}

export async function getMe(): Promise<User> {
  const { data } = await API.get<User>(API_ROUTES.PROFILE)
  return data
}

export async function requestPasswordReset(
  dto: RequestPasswordResetDto,
): Promise<boolean> {
  const { data } = await API.post<boolean>(
    API_ROUTES.REQUEST_PASSWORD_RESET,
    dto,
  )
  return data
}

export async function resetPassword(dto: ResetPasswordDto): Promise<boolean> {
  const { data } = await API.post<boolean>(API_ROUTES.RESET_PASSWORD, dto)
  return data
}
