import z from 'zod'
import { LucideIcon } from 'lucide-react'
import { User } from '@features/auth'
import { BaseFormFields } from '@shared/form'
import { profileEditSchema } from '../schemas'

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

export type ProfileEditFormData = z.infer<typeof profileEditSchema>

export interface UpdateProfileResponse {
  user: User
}

export interface ProfileEditFormField extends BaseFormFields {
  name: keyof ProfileEditFormData
}
