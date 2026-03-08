import { RegisterFormField } from '../types'

export const registerFormFields: RegisterFormField[] = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Введите почту для авторизации',
    required: true,
  },
  {
    name: 'name',
    id: 'name',
    type: 'text',
    label: 'Имя',
    placeholder: 'Введите ваше имя',
    required: true,
  },
  {
    name: 'phone',
    id: 'phone',
    type: 'tel',
    label: 'Номер телефона',
    placeholder: 'Введите ваш номер телефона',
    required: true,
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Придумайте пароль',
    required: true,
  },
  {
    name: 'confirmPassword',
    id: 'confirmPassword',
    type: 'password',
    label: 'Повторите пароль',
    placeholder: 'Повторите пароль',
    required: true,
  },
]
