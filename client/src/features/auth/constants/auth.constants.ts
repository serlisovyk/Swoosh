export const LOGIN_FORM_DEFAULT_VALUES = {
  email: '',
  password: '',
}

export const REGISTER_FORM_DEFAULT_VALUES = {
  email: '',
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

export const FORGOT_PASSWORD_FORM_DEFAULT_VALUES = {
  email: '',
}

export const RESET_PASSWORD_FORM_DEFAULT_VALUES = {
  newPassword: '',
  confirmPassword: '',
}

export const TOKEN_REGEX = /^[a-f0-9]{64}$/i

export const invalidResetPasswordTokenMessage =
  'Недействительная или просроченная ссылка для сброса пароля'
