import { ROUTES } from '@shared/config'

export const FAVORITES_BREADCRUMBS = [
  { label: 'Доставка и оплата', href: ROUTES.DELIVERY },
]

export const DELIVERY_INFO = [
  {
    title: 'Доставка курьером до двери:',
    description:
      'Мы доставим ваш заказ прямо к вашей двери в течение 3-5 рабочих дней.',
    prefix: '1.',
  },
  {
    title: 'Самовывоз:',
    description:
      'Вы можете забрать свой заказ самостоятельно из нашего магазина.',
    prefix: '2.',
  },
]

export const PAYMENT_INFO = [
  {
    title: 'Наложенный платеж:',
    description:
      'Вы можете выбрать наложенный платеж, и курьер примет оплату наличными при доставке.',
    prefix: '1.',
  },
  {
    title: 'Оплата при получении:',
    description:
      'Вы можете выбрать оплату при получении, и заплатит уже в магазине при получении заказа.',
    prefix: '2.',
  },
]
