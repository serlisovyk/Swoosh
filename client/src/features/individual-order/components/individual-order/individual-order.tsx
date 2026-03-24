import { Breadcrumbs, Heading } from '@shared/ui'
import { IndividualOrderInfo } from '../individual-order-info'
import { IndividualOrderForm } from '../individual-order-form'
import { INDIVIDUAL_ORDER_BREADCRUMBS } from '../../constants'
import styles from './individual-order.module.css'

export function IndividualOrder() {
  return (
    <div className="container">
      <Breadcrumbs items={INDIVIDUAL_ORDER_BREADCRUMBS} />

      <Heading className={styles.title} as="h1">
        Индивидуальный заказ
      </Heading>
      <div className={styles.description}>
        Здесь вы можете стать обладателем поистине уникальных и лимитированных
        моделей кроссовок, ожидая их поступления в продажу. Мы ценим вашу
        страсть к стилю и предоставляем вам уникальную возможность заказать
        кроссовки, которые будут дополнением вашей индивидуальности.
      </div>

      <div className={styles.content}>
        <IndividualOrderInfo />
        <IndividualOrderForm />
      </div>
    </div>
  )
}
