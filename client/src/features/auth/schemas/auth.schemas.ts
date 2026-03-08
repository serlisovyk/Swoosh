import z from 'zod'
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
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

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    phone: phoneSchema,
    confirmPassword: confirmPasswordSchema,
    terms: termsSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })
