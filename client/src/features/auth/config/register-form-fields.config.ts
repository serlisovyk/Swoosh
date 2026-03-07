import { RegisterFormField } from '../types'

export const registerFormFields: RegisterFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Введите почту для авторизации',
    required: true,
  },
  {
    name: 'name',
    type: 'text',
    label: 'Имя',
    placeholder: 'Введите ваше имя',
    required: true,
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Номер телефона',
    placeholder: 'Введите ваш номер телефона',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: 'Придумайте пароль',
    required: true,
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Повторите пароль',
    placeholder: 'Повторите пароль',
    required: true,
  },
]
