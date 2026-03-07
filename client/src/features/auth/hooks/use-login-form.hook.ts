import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas'
import { LOGIN_FORM_DEFAULT_VALUES } from '../constants'
import { LoginFormData } from '../types'

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
    resolver: zodResolver(loginSchema),
  })

  return {
    register,
    handleSubmit,
    errors,
    isFormValid: isValid,
  }
}
