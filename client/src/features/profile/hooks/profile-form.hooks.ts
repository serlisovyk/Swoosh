'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetMeQuery } from '@features/auth'
import { profileEditSchema, changePasswordSchema } from '../schemas'
import {
  EDIT_PROFILE_FORM_DEFAULT_VALUES,
  CHANGE_PASSWORD_FORM_DEFAULT_VALUES,
} from '../constants'
import { ProfileEditFormData, ChangePasswordFormData } from '../types'

export function useProfileEditForm() {
  const { user } = useGetMeQuery()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileEditFormData>({
    mode: 'onSubmit',
    defaultValues: EDIT_PROFILE_FORM_DEFAULT_VALUES,
    resolver: zodResolver(profileEditSchema),
  })

  useEffect(() => {
    reset({
      email: user?.email || '',
      name: user?.name || '',
      phone: user?.phone || '',
    })
  }, [user, reset])

  return { register, handleSubmit, errors }
}

export function useChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    mode: 'onSubmit',
    defaultValues: CHANGE_PASSWORD_FORM_DEFAULT_VALUES,
    resolver: zodResolver(changePasswordSchema),
  })

  return { register, handleSubmit, errors }
}
