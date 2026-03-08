import { LoginFormField } from '../types'

export const loginFormFields: LoginFormField[] = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Введите почту для авторизации',
    required: true,
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    required: true,
  },
]
