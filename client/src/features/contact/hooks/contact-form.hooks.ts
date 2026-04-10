'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '../schemas'
import { CONTACT_FORM_DEFAULT_VALUES } from '../constants'
import type { ContactFormValues } from '../types'

export function useContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: 'onSubmit',
    defaultValues: CONTACT_FORM_DEFAULT_VALUES,
    resolver: zodResolver(contactSchema),
  })

  return { register, handleSubmit, reset, errors }
}
