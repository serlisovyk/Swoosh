import cn from 'clsx'
import { formatProductSize } from '../../../../../../utils'
import { ProductDetailsPurchaseSizesProps } from '../../../../../../types'
import styles from './product-details-purchase-sizes.module.css'

export function ProductDetailsPurchaseSizes({
  sizes,
  activeSize,
  onSelectSize,
  onOpenSizeGuide,
}: ProductDetailsPurchaseSizesProps) {
  if (!sizes.length) return null

  return (
    <div className={styles.optionBlock}>
      <div className={styles.optionHeader}>
        <span className={styles.optionLabel}>Размер (EU):</span>

        <button
          type="button"
          className={styles.sizeGuideButton}
          onClick={onOpenSizeGuide}
        >
          Размерная таблица
        </button>
      </div>

      <div className={styles.sizesGrid}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={activeSize === size}
            onClick={() => onSelectSize(size)}
            className={cn(styles.sizeButton, {
              [styles.sizeButtonActive]: activeSize === size,
            })}
          >
            {formatProductSize(size)}
          </button>
        ))}
      </div>
    </div>
  )
}
