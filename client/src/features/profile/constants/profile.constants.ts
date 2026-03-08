import { ProfileEditFormData, ChangePasswordFormData } from '../types'

export const EDIT_PROFILE_FORM_DEFAULT_VALUES: ProfileEditFormData = {
  email: '',
  name: '',
  phone: '',
}

export const CHANGE_PASSWORD_FORM_DEFAULT_VALUES: ChangePasswordFormData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}
