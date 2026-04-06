import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import z from 'zod'
import { BaseFormFields, FIELD_VARIANTS } from '@shared/form'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../schemas'

export type LoginFormData = z.infer<typeof loginSchema>

export type RegisterFormData = z.infer<typeof registerSchema>

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export interface LoginFormField extends BaseFormFields {
  name: keyof LoginFormData
  variant?: typeof FIELD_VARIANTS.INPUT
}

export interface RegisterFormField extends BaseFormFields {
  name: keyof RegisterFormData
  variant?: typeof FIELD_VARIANTS.INPUT
}

export interface ForgotPasswordFormField extends BaseFormFields {
  name: keyof ForgotPasswordFormData
  variant?: typeof FIELD_VARIANTS.INPUT
}

export interface ResetPasswordFormField extends BaseFormFields {
  name: keyof ResetPasswordFormData
  variant?: typeof FIELD_VARIANTS.INPUT
}

export type RegisterDto = Omit<RegisterFormData, 'confirmPassword' | 'terms'>

export type LoginDto = LoginFormData

export type LoginPayload = LoginFormData & FavoritesSyncPayload

export type RegisterPayload = RegisterDto & FavoritesSyncPayload

export interface RequestPasswordResetDto {
  email: string
}

export interface ResetPasswordDto {
  token: string
  newPassword: string
}

export interface VerifyEmailDto {
  token: string
}

export interface AuthResponse {
  user: User
}

export interface User {
  _id: string
  email: string
  isEmailVerified: boolean
  role: ROLE
  name: string
  phone: string
  favoriteProductIds: string[]
  address?: UserAddress | null
}

export interface UserAddress {
  company: string
  region: string
  city: string
  street: string
  zip: string
  buildingNumber: string
}

export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export type ROLE = (typeof ROLE)[keyof typeof ROLE]

interface FavoritesSyncPayload {
  favoriteProductIds?: string[]
}

export interface CaptchaContextValue {
  captchaRef: RefObject<TurnstileInstance | null>
  captchaToken: string | null
  setCaptchaToken: Dispatch<SetStateAction<string | null>>
  resetCaptcha: () => void
  validateCaptcha: () => boolean
  getCaptchaHeader: () => Record<string, string | null>
}

export interface SocialAuthButton {
  provider: 'google' | 'github'
  label: string
}

export interface GetMeQueryOptions {
  enabled?: boolean
}
