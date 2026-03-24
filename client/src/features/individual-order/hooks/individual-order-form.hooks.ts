'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { individualOrderSchema } from '../schemas'
import { INDIVIDUAL_ORDER_FORM_DEFAULT_VALUES } from '../constants'
import type { IndividualOrderFormValues } from '../types'

export function useIndividualOrderForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IndividualOrderFormValues>({
    mode: 'onSubmit',
    defaultValues: INDIVIDUAL_ORDER_FORM_DEFAULT_VALUES,
    resolver: zodResolver(individualOrderSchema),
  })

  return { register, handleSubmit, reset, errors }
}
