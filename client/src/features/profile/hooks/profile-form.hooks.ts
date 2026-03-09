'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetMeQuery } from '@features/auth'
import {
  profileEditSchema,
  changePasswordSchema,
  profileAddressSchema,
} from '../schemas'
import {
  EDIT_PROFILE_FORM_DEFAULT_VALUES,
  CHANGE_PASSWORD_FORM_DEFAULT_VALUES,
  ADDRESS_PROFILE_FORM_DEFAULT_VALUES,
} from '../constants'
import {
  ProfileEditFormData,
  ChangePasswordFormData,
  ProfileAddressFormData,
} from '../types'

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

export function useProfileAddressForm() {
  const { user } = useGetMeQuery()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileAddressFormData>({
    mode: 'onSubmit',
    defaultValues: ADDRESS_PROFILE_FORM_DEFAULT_VALUES,
    resolver: zodResolver(profileAddressSchema),
  })

  useEffect(() => {
    reset({
      name: user?.name || '',
      company: user?.address?.company || '',
      region: user?.address?.region || '',
      city: user?.address?.city || '',
      street: user?.address?.street || '',
      zip: user?.address?.zip || '',
      buildingNumber: user?.address?.buildingNumber || '',
    })
  }, [user, reset])

  return { register, handleSubmit, errors }
}
