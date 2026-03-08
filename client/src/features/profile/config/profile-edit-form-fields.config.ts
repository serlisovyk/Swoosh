import { ProfileEditFormField } from '../types'

export const profileEditFormFields: ProfileEditFormField[] = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Введите email адрес',
    required: true,
  },
  {
    name: 'name',
    id: 'name',
    type: 'text',
    label: 'Ваше имя',
    placeholder: 'Как вас зовут',
    required: true,
  },
  {
    name: 'phone',
    id: 'phone',
    type: 'tel',
    label: 'Номер телефона',
    placeholder: 'Ваш номер телефона',
    required: true,
  },
]
