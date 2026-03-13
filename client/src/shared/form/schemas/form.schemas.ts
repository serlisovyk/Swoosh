import z from 'zod'

export const emailSchema = z
  .string({ message: 'Почта обязателена' })
  .pipe(z.email({ message: 'Неверный формат почты' }))

export const passwordSchema = z
  .string({ message: 'Пароль обязателен' })
  .min(6, { message: 'Пароль должен быть не менее 6 символов' })

export const nameSchema = z
  .string({ message: 'Имя обязательно' })
  .min(2, { message: 'Имя должно быть не менее 2 символов' })

export const phoneSchema = z
  .string({ message: 'Телефон обязателен' })
  .min(8, { message: 'Телефон должен быть не менее 8 символов' })
