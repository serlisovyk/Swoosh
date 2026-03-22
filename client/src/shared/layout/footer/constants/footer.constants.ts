import { ROUTES } from '@shared/config'

export const FOOTER_SOCIALS = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com',
    icon: '/images/icons/facebook.svg',
  },
  {
    name: 'Google',
    link: 'https://www.google.com',
    icon: '/images/icons/google.svg',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/yourprofile',
    icon: '/images/icons/instagram.svg',
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
