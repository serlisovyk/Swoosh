import z from 'zod'
import { LucideIcon } from 'lucide-react'
import { MouseEventHandler } from 'react'
import { User } from '@features/auth'
import { BaseFormFields, FIELD_VARIANTS } from '@shared/form'
import {
  profileEditSchema,
  changePasswordSchema,
  profileAddressSchema,
} from '../schemas'

export interface ProfileMenuProps {
  isCompact?: boolean
}

export interface LogoutButtonProps {
  isCompact?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface ProfileMenuItemProps {
  id: string
  href: string
  text: string
  icon: LucideIcon
  isCompact?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export interface AddressHeaderProps {
  name: string
  isAddressEmpty: boolean
}

export interface ProfileMenuDrawerButtonProps {
  isCompact: boolean
  openDrawer: () => void
}

export interface UseUpdateProfileMutationOptions {
  toastMessage?: string
  route?: string
}

export interface UpdateProfileResponse {
  user: User
}

export interface UpdateProfileDto {
  email?: string
  name?: string
  phone?: string
  newPassword?: string
  currentPassword?: string
  address?: UpdateAddressDto
}

export interface UpdateAddressDto {
  company?: string
  region?: string
  city?: string
  street?: string
  zip?: string
  buildingNumber?: string
}

export type ProfileEditFormData = z.infer<typeof profileEditSchema>

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export type ProfileAddressFormData = z.infer<typeof profileAddressSchema>

export interface ProfileEditFormField extends BaseFormFields {
  name: keyof ProfileEditFormData
  variant?: typeof FIELD_VARIANTS.INPUT
}

export interface ChangePasswordFormField extends BaseFormFields {
  name: keyof ChangePasswordFormData
  variant?: typeof FIELD_VARIANTS.INPUT
}

export interface ProfileAddressFormField extends BaseFormFields {
  name: keyof ProfileAddressFormData
  isFullWidth?: boolean
  variant?: typeof FIELD_VARIANTS.INPUT
}
