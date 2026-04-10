import { FIELD_VARIANTS, type BaseFormFields } from '@shared/form'

export interface ContactFormValues {
  name: string
  email: string
  message: string
}

export interface CreateContactRequestPayload {
  name: string
  email: string
  message?: string
}

export type CreateContactRequestResponse = boolean

export interface ContactFormField extends BaseFormFields {
  name: keyof ContactFormValues
  variant?: typeof FIELD_VARIANTS.INPUT | typeof FIELD_VARIANTS.TEXTAREA
  type?: 'text' | 'email'
  autoComplete?: string
  inputMode?: 'text' | 'email'
  rows?: number
}
