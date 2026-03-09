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

export const companySchema = z.string().optional()

export const regionSchema = z.string({
  message: 'Область / Регион обязательны',
})

export const citySchema = z.string({ message: 'Город обязателен' })

export const streetSchema = z.string({ message: 'Улица обязательна' })

export const zipSchema = z.string({ message: 'Индекс обязателен' })

export const buildingNumberSchema = z.string({
  message: 'Номер дома / Квартира обязательны',
})

export const profileAddressSchema = z.object({
  name: nameSchema,
  company: companySchema,
  region: regionSchema,
  city: citySchema,
  street: streetSchema,
  zip: zipSchema,
  buildingNumber: buildingNumberSchema,
})
