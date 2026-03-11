import z from 'zod'
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  withMatchingPasswords,
} from '@shared/form'

const confirmPasswordSchema = z.string({
  message: 'Подтверждение пароля обязательно',
})

const termsSchema = z.literal(true, {
  message: 'Вы должны принять условия',
})

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerSchema = withMatchingPasswords(
  z.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    phone: phoneSchema,
    confirmPassword: confirmPasswordSchema,
    terms: termsSchema,
  }),
  { passwordField: 'password' },
)

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = withMatchingPasswords(
  z.object({
    newPassword: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  }),
  { passwordField: 'newPassword' },
)
