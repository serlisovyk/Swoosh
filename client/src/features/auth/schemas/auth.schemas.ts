import z from 'zod'

const emailSchema = z
  .string({ message: 'Почта обязателен' })
  .pipe(z.email({ message: 'Неверный формат почты' }))

const passwordSchema = z
  .string({ message: 'Пароль обязателен' })
  .min(6, { message: 'Пароль должен быть не менее 6 символов' })

const nameSchema = z
  .string({ message: 'Имя обязательно' })
  .min(2, { message: 'Имя должно быть не менее 2 символов' })

const phoneSchema = z
  .string({ message: 'Телефон обязателен' })
  .min(8, { message: 'Телефон должен быть не менее 8 символов' })

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
