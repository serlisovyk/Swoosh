import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, loginSchema } from '../schemas'
import {
  REGISTER_FORM_DEFAULT_VALUES,
  LOGIN_FORM_DEFAULT_VALUES,
} from '../constants'
import { RegisterFormData, LoginFormData } from '../types'

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onSubmit',
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
    resolver: zodResolver(registerSchema),
  })

  return { register, handleSubmit, errors }
}

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
    resolver: zodResolver(loginSchema),
  })

  return { register, handleSubmit, errors }
}
