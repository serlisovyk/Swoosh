import { formatProductPrice } from '../../../../../../utils'
import type { ProductDetailsPurchasePriceProps } from '../../../../../../types'
import styles from './product-details-purchase-price.module.css'

export function ProductDetailsPurchasePrice({
  price,
  oldPrice,
}: ProductDetailsPurchasePriceProps) {
  return (
    <div className={styles.priceRow}>
      {oldPrice && (
        <span className={styles.oldPrice}>{formatProductPrice(oldPrice)}</span>
      )}

      <span className={styles.currentPrice}>{formatProductPrice(price)}</span>
    </div>
  )
}
