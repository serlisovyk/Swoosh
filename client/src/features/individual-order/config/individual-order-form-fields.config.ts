import type { IndividualOrderFormField } from '../types'

export const individualOrderFormFields: IndividualOrderFormField[] = [
  {
    name: 'name',
    id: 'individual-order-name',
    type: 'text',
    label: 'Ваше имя',
    placeholder: 'Как вас зовут',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'phone',
    id: 'individual-order-phone',
    type: 'tel',
    label: 'Номер телефона',
    placeholder: 'Введите ваш номер телефона',
    autoComplete: 'tel',
    inputMode: 'tel',
    required: true,
  },
  {
    name: 'email',
    id: 'individual-order-email',
    type: 'email',
    label: 'Email',
    placeholder: 'Введите ваш email адрес',
    autoComplete: 'email',
    inputMode: 'email',
    required: true,
  },
  {
    name: 'message',
    id: 'individual-order-message',
    type: 'textarea',
    label: 'Сообщение',
    placeholder: 'Укажите любой другой способ связи',
    rows: 5,
    required: false,
  },
]
