import { FIELD_APPEARANCES, FIELD_VARIANTS } from '@shared/form'
import type { ContactFormField } from '../types'

export const contactFormFields: ContactFormField[] = [
  {
    name: 'name',
    id: 'contact-name',
    type: 'text',
    label: 'Ваше имя',
    autoComplete: 'name',
    required: true,
    appearance: FIELD_APPEARANCES.UNDERLINE,
  },
  {
    name: 'email',
    id: 'contact-email',
    type: 'email',
    label: 'Ваш Email',
    autoComplete: 'email',
    inputMode: 'email',
    required: true,
    appearance: FIELD_APPEARANCES.UNDERLINE,
  },
  {
    name: 'message',
    id: 'contact-message',
    variant: FIELD_VARIANTS.TEXTAREA,
    label: 'Текст вопроса',
    rows: 4,
    required: false,
    appearance: FIELD_APPEARANCES.UNDERLINE,
  },
]
