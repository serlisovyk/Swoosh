import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas'
import { REGISTER_FORM_DEFAULT_VALUES } from '../constants'
import { RegisterFormData } from '../types'

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    mode: 'onSubmit',
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
    resolver: zodResolver(registerSchema),
  })

  return {
    register,
    handleSubmit,
    errors,
    isFormValid: isValid,
  }
}
