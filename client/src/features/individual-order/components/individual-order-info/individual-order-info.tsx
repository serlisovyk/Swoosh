import { Heading, Info } from '@shared/ui'
import { INDIVIDUAL_ORDER_INFO } from '../../constants'
import styles from './individual-order-info.module.css'

export function IndividualOrderInfo() {
  return (
    <div>
      <Heading as="h2" className={styles.title}>
        Условия заказа:
      </Heading>

      <div className={styles.info}>
        {INDIVIDUAL_ORDER_INFO.map(({ prefix, description, title }) => (
          <Info
            key={prefix}
            prefix={prefix}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  )
}
