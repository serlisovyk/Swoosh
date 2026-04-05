import { FIELD_VARIANTS, type BaseFormFields } from '@shared/form'

export interface IndividualOrderFormValues {
  name: string
  phone: string
  email: string
  message: string
}

export interface CreateIndividualOrderPayload {
  name: string
  phone: string
  email: string
  message?: string
}

export interface CreateIndividualOrderResponse {
  _id: string
  name: string
  phone: string
  email: string
  message?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface IndividualOrderFormField extends BaseFormFields {
  name: keyof IndividualOrderFormValues
  variant?: typeof FIELD_VARIANTS.INPUT | typeof FIELD_VARIANTS.TEXTAREA
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel'
  rows?: number
}
