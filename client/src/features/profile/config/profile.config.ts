import { ROUTES } from '@shared/config'
import {
  ProfileEmailVerificationContent,
  ProfileEmailVerificationNoticeVariant,
} from '../types'

export const PROFILE_MUTATING_ROUTES = [
  ROUTES.EDIT_PROFILE,
  ROUTES.ADDRESS_EDIT,
  ROUTES.CHANGE_PASSWORD,
]

export const verificationNoticeContent: Record<
  ProfileEmailVerificationNoticeVariant,
  ProfileEmailVerificationContent
> = {
  banner: {
    title: 'Подтвердите почту',
    description:
      'Аккаунт уже создан и доступен для просмотра, но для изменения данных профиля нужно подтвердить email по ссылке из письма.',
  },
  blocked: {
    title: 'Сначала подтвердите почту',
    description:
      'Эта страница доступна только после подтверждения email. Проверьте письмо после регистрации или отправьте ссылку повторно.',
  },
}
