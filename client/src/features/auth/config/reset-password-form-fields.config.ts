import { ResetPasswordFormField } from '../types'

export const resetPasswordFormFields: ResetPasswordFormField[] = [
  {
    name: 'newPassword',
    id: 'newPassword',
    type: 'password',
    label: 'Новый пароль',
    placeholder: 'Введите новый пароль',
    required: true,
  },
  {
    name: 'confirmPassword',
    id: 'confirmPassword',
    type: 'password',
    label: 'Повторите новый пароль',
    placeholder: 'Повторите новый пароль',
    required: true,
  },
]
