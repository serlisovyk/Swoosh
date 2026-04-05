import { CheckCircle2, MailCheck, TriangleAlert } from 'lucide-react'
import { ROUTES } from '@shared/config'
import {
  VERIFY_EMAIL_VIEW_STATUSES,
  type VerifyEmailViewStateConfig,
} from '../types'

export const VERIFY_EMAIL_VIEW_STATE_CONFIG: Record<
  VERIFY_EMAIL_VIEW_STATUSES,
  VerifyEmailViewStateConfig
> = {
  [VERIFY_EMAIL_VIEW_STATUSES.SUCCESS]: {
    icon: CheckCircle2,
    title: 'Почта подтверждена',
    description: 'Всё готово. Сейчас перенаправим вас в личный кабинет.',
    actionHref: ROUTES.PROFILE,
    actionLabel: 'Перейти в профиль',
  },
  [VERIFY_EMAIL_VIEW_STATUSES.ERROR]: {
    icon: TriangleAlert,
    title: 'Не удалось подтвердить почту',
    description: 'Не удалось подтвердить почту.',
    actionHref: ROUTES.LOGIN,
    actionLabel: 'Перейти ко входу',
  },
  [VERIFY_EMAIL_VIEW_STATUSES.PENDING]: {
    icon: MailCheck,
    title: 'Подтверждаем почту',
    description: 'Проверяем ссылку из письма и обновляем статус аккаунта.',
  },
}
