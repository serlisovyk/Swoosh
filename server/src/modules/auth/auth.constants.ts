export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken' as const
export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken' as const

export const INVALID_PASSWORD_ERROR = 'Неверный пароль'
export const USER_NOT_FOUND_ERROR = 'Пользователь с таким email не найден'

export const INVALID_REFRESH_TOKEN_ERROR = 'Неверный refresh токен'

export const REFRESH_TOKEN_MISSING_ERROR = 'Отсутствует refresh токен'

export const EMAIL_VALIDATION_ERROR = 'Email должен быть валидным email адресом'
export const PASSWORD_STRING_ERROR = 'Пароль должен быть строкой'
export const PASSWORD_MIN_LENGTH_ERROR =
  'Пароль должен быть не менее 6 символов'
export const NAME_STRING_ERROR = 'Имя должно быть строкой'
export const PHONE_STRING_ERROR = 'Телефон должен быть строкой'

export const TOKEN_NOT_EMPTY_ERROR = 'Токен не должен быть пустым'
export const TOKEN_STRING_ERROR = 'Токен должен быть строкой'
export const INVALID_OR_EXPIRED_PASSWORD_RESET_TOKEN_ERROR =
  'Недействительная или просроченная ссылка для сброса пароля'

export const RESET_PASSWORD_URL = '/auth/reset-password'
export const RESET_PASSWORD_SUBJECT = 'Сброс пароля'
