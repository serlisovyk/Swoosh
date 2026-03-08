'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetMeQuery } from '@features/auth'
import { profileEditSchema } from '../schemas'
import { EDIT_PROFILE_FORM_DEFAULT_VALUES } from '../constants'
import { ProfileEditFormData } from '../types'

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
