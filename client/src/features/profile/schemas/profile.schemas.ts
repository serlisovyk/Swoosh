import z from 'zod'
import {
  emailSchema,
  nameSchema,
  phoneSchema,
  passwordSchema,
  withMatchingPasswords,
} from '@shared/form'

export const profileEditSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  phone: phoneSchema,
})

export const changePasswordSchema = withMatchingPasswords(
  z.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  }),
  { passwordField: 'newPassword' },
)
