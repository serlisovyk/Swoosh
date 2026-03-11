import { ForgotPasswordFormField } from '../types'

export const forgotPasswordFormFields: ForgotPasswordFormField[] = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    label: 'Email или логин',
    placeholder: 'Введите email адрес или логин',
    required: true,
  },
]
