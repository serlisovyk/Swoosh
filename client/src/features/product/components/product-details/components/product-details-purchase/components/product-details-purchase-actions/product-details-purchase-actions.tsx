import { ShoppingBasket } from 'lucide-react'
import { Button } from '@shared/ui'
import { ProductDetailsPurchaseActionsProps } from '../../../../../../types'
import styles from './product-details-purchase-actions.module.css'

export function ProductDetailsPurchaseActions({
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: ProductDetailsPurchaseActionsProps) {
  return (
    <div className={styles.actionsRow}>
      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.quantityButton}
          onClick={onDecreaseQuantity}
          aria-label="Уменьшить количество"
        >
          -
        </button>

        <span className={styles.quantityValue}>{quantity}</span>

        <button
          type="button"
          className={styles.quantityButton}
          onClick={onIncreaseQuantity}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>

      <Button
        type="button"
        variant="dark"
        icon={ShoppingBasket}
      >
        Добавить в корзину
      </Button>
    </div>
  )
}
