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
