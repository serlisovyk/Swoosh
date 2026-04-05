'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../schemas'
import {
  FORGOT_PASSWORD_FORM_DEFAULT_VALUES,
  REGISTER_FORM_DEFAULT_VALUES,
  LOGIN_FORM_DEFAULT_VALUES,
  RESET_PASSWORD_FORM_DEFAULT_VALUES,
} from '../constants'
import {
  ForgotPasswordFormData,
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
} from '../types'

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

export function useForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    mode: 'onSubmit',
    defaultValues: FORGOT_PASSWORD_FORM_DEFAULT_VALUES,
    resolver: zodResolver(forgotPasswordSchema),
  })

  return { register, handleSubmit, errors }
}

export function useResetPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    mode: 'onSubmit',
    defaultValues: RESET_PASSWORD_FORM_DEFAULT_VALUES,
    resolver: zodResolver(resetPasswordSchema),
  })

  return { register, handleSubmit, setError, errors }
}
