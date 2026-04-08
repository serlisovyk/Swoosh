import { Facebook, Instagram, Youtube } from 'lucide-react'
import { ROUTES } from '@shared/config'

export const FOOTER_SOCIALS = [
  {
    name: 'Фейсбук',
    link: 'https://www.facebook.com',
    icon: Facebook,
  },
  {
    name: 'Инстаграм',
    link: 'https://www.instagram.com',
    icon: Instagram,
  },
  {
    name: 'Ютуб',
    link: 'https://www.youtube.com',
    icon: Youtube,
  },
]

export const FOOTER_LINKS = [
  {
    title: 'Информация',
    items: [
      { text: 'О магазине', link: ROUTES.ABOUT },
      { text: 'Наш блог', link: ROUTES.BLOG },
      { text: 'Доставка и оплата', link: ROUTES.DELIVERY },
      { text: 'Контакты', link: ROUTES.CONTACT },
    ],
  },
  {
    title: 'Магазин',
    items: [
      { text: 'Каталог', link: ROUTES.CATALOG },
      { text: 'Личный кабинет', link: ROUTES.PROFILE },
      { text: 'Избранное', link: ROUTES.FAVORITES },
      { text: 'Корзина', link: ROUTES.CART },
    ],
  },
]
