import { ROUTES } from '@shared/config'
import type { IndividualOrderFormValues } from '../types'

export const INDIVIDUAL_ORDER_FORM_DEFAULT_VALUES: IndividualOrderFormValues = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

export const INDIVIDUAL_ORDER_BREADCRUMBS = [
  { label: 'Индивидуальный заказ', href: ROUTES.INDIVIDUAL_ORDER },
]

export const INDIVIDUAL_ORDER_INFO = [
  {
    title: 'Выбор модели:',
    description:
      'Ознакомьтесь с нашим каталогом лимитированных моделей и выберите ту, которая вам больше всего понравилась.',
    prefix: '1.',
  },
  {
    title: 'Заполнение формы заказа:',
    description:
      'Заполните форму заказа, указав свои контактные данные, размер обуви и другие необходимые сведения. Убедитесь, что вся информация указана правильно.',
    prefix: '2.',
  },
  {
    title: 'Сроки ожидания:',
    description:
      'Обычно срок поступления лимитированных кроссовок составляет 4-6 недель с момента оформления заказа и внесения предоплаты.',
    prefix: '3.',
  },
  {
    title: 'Доставка:',
    description:
      'После полной оплаты мы доставим ваши уникальные кроссовки прямо к вам по указанному адресу.',
    prefix: '4.',
  },
]
