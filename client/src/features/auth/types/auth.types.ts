import z from 'zod'
import { loginSchema, registerSchema } from '../schemas'

export type LoginFormData = z.infer<typeof loginSchema>

export type RegisterFormData = z.infer<typeof registerSchema>

export interface LoginFormField extends BaseFormFields {
  name: keyof LoginFormData
}

export interface RegisterFormField extends BaseFormFields {
  name: keyof RegisterFormData
}

interface BaseFormFields {
  type: string
  label: string
  placeholder: string
  required: boolean
}

export type RegisterDto = Omit<RegisterFormData, 'confirmPassword' | 'terms'>

export interface AuthResponse {
  user: User
}

export interface User {
  _id: string
  email: string
  role: ROLE
  name: string
  phone: string
}

const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export type ROLE = (typeof ROLE)[keyof typeof ROLE]
