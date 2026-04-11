import {
  CircleUser,
  UserPen,
  ListOrdered,
  MapPinHouse,
  Heart,
  LockKeyholeIcon,
  MonitorSmartphone,
} from 'lucide-react'
import { ROUTES } from '@shared/config'

export const profileMenuItems = [
  {
    id: 'account',
    text: 'Мой аккаунт',
    href: ROUTES.PROFILE,
    icon: CircleUser,
  },
  {
    id: 'edit',
    text: 'Редактировать профиль',
    href: ROUTES.EDIT_PROFILE,
    icon: UserPen,
  },
  {
    id: 'orders',
    text: 'Мои заказы',
    href: ROUTES.ORDERS,
    icon: ListOrdered,
  },
  {
    id: 'address',
    text: 'Мой адрес',
    href: ROUTES.ADDRESS,
    icon: MapPinHouse,
  },
  {
    id: 'favorites',
    text: 'Избранные товары',
    href: ROUTES.FAVORITES,
    icon: Heart,
  },
  {
    id: 'change-password',
    text: 'Сменить пароль',
    href: ROUTES.CHANGE_PASSWORD,
    icon: LockKeyholeIcon,
  },
  {
    id: 'sessions',
    text: 'Активные сессии',
    href: ROUTES.SESSIONS,
    icon: MonitorSmartphone,
  },
]
