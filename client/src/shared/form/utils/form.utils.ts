import z from 'zod'
import { MatchPasswordsOptions } from '../types'

export function withMatchingPasswords<T extends z.ZodObject>(
  schema: T,
  fields: MatchPasswordsOptions,
): T {
  const { passwordField, confirmPasswordField = 'confirmPassword' } = fields

  return schema.refine(
    (data) => data[passwordField] === data[confirmPasswordField],
    {
      message: 'Пароли не совпадают',
      path: [confirmPasswordField],
    },
  )
}
