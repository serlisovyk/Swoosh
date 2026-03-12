import {
  ProfileEditFormData,
  ChangePasswordFormData,
  ProfileAddressFormData,
} from '../types'

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

export const ADDRESS_PROFILE_FORM_DEFAULT_VALUES: ProfileAddressFormData = {
  name: '',
  company: '',
  region: '',
  city: '',
  street: '',
  zip: '',
  buildingNumber: '',
}

export const PROFILE_BREADCRUMBS = [
  { label: 'Личный кабинет', href: '/profile' },
]
