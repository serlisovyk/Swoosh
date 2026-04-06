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

export const CAPTCHA_REQUIRED_ERROR = 'Подтверди, что ты не робот'

export const VERIFY_EMAIL_INVALID_TOKEN_MESSAGE =
  'Недействительная или просроченная ссылка для подтверждения почты'

export const SOCIAL_AUTH_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export const SOCIAL_AUTH_ERROR_MESSAGE =
  'Не удалось завершить вход через соцсеть. Попробуйте снова.'
