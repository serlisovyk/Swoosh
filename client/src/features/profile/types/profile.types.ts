import z from 'zod'
import { LucideIcon } from 'lucide-react'
import { User } from '@features/auth'
import { BaseFormFields } from '@shared/form'
import { profileEditSchema, changePasswordSchema } from '../schemas'

export interface ProfileMenuProps {
  isCompact?: boolean
}

export interface LogoutButtonProps {
  isCompact?: boolean
}

export interface ProfileMenuItemProps {
  id: string
  href: string
  text: string
  icon: LucideIcon
  isCompact?: boolean
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
}

export type ProfileEditFormData = z.infer<typeof profileEditSchema>

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export interface ProfileEditFormField extends BaseFormFields {
  name: keyof ProfileEditFormData
}

export interface ChangePasswordFormField extends BaseFormFields {
  name: keyof ChangePasswordFormData
}
