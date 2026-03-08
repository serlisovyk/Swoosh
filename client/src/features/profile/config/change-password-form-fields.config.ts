import type { ChangePasswordFormField } from '../types'

export const changePasswordFormFields: ChangePasswordFormField[] = [
  {
    name: 'currentPassword',
    id: 'currentPassword',
    type: 'password',
    label: 'Текущий пароль',
    placeholder: 'Введите текущий пароль',
    required: true,
  },
  {
    name: 'newPassword',
    id: 'newPassword',
    type: 'password',
    label: 'Новый пароль',
    placeholder: 'Придумайте пароль',
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
