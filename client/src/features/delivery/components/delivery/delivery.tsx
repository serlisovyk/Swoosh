import { Breadcrumbs, Heading, Info } from '@shared/ui'
import { DELIVERY_INFO, FAVORITES_BREADCRUMBS, PAYMENT_INFO } from './constants'
import styles from './delivery.module.css'

export function Delivery() {
  return (
    <div className="container">
      <Breadcrumbs items={FAVORITES_BREADCRUMBS} />

      <Heading as="h1" className={styles.title}>
        Доставка и оплата
      </Heading>
      <div className={styles.description}>
        Мы стремимся сделать процесс получения вашего заказа максимально удобным
        и прозрачным. Пожалуйста, ознакомьтесь с вариантами доставки и способами
        оплаты, предоставленными ниже:
      </div>

      <div className={styles.info}>
        <div>
          <Heading as="h2" className={styles.subtitle}>
            Доставка
          </Heading>
          <div className={styles.subdescription}>
            Мы сотрудничаем с лучшими транспортными компаниями для обеспечения
            надежной и быстрой доставки в любой уголок мира. При оформлении
            заказа вы можете выбрать один из следующих вариантов доставки:
          </div>
          <div>
            {DELIVERY_INFO.map(({ title, description, prefix }) => (
              <Info
                key={title}
                title={title}
                description={description}
                prefix={prefix}
              />
            ))}
          </div>
        </div>

        <div>
          <Heading as="h2" className={styles.subtitle}>
            Оплата:
          </Heading>
          <div className={styles.subdescription}>
            Мы предоставляем разнообразные способы оплаты, чтобы обеспечить ваш
            комфорт:
          </div>
          <div>
            {PAYMENT_INFO.map(({ title, description, prefix }) => (
              <Info
                key={title}
                title={title}
                description={description}
                prefix={prefix}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
