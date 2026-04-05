import z from 'zod'
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  withMatchingPasswords,
} from '@shared/form'
import { createTokenSchema } from '../utils'
import {
  invalidResetPasswordTokenMessage,
  VERIFY_EMAIL_INVALID_TOKEN_MESSAGE,
} from '../constants'

const confirmPasswordSchema = z.string({
  message: 'Подтверждение пароля обязательно',
})

const termsSchema = z.literal(true, {
  message: 'Вы должны принять условия',
})

export const resetPasswordTokenSchema = createTokenSchema(
  invalidResetPasswordTokenMessage,
)

export const emailVerificationTokenSchema = createTokenSchema(
  VERIFY_EMAIL_INVALID_TOKEN_MESSAGE,
)

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
