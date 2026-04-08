'use client'

import cn from 'clsx'
import { useProductFiltersContext } from '../../../../context'
import { ProductSizeFilter } from '../product-size-filter'
import { ProductPriceFilter } from '../product-price-filter'
import { ProductColorFilter } from '../product-color-filter'
import { ProductMaterialFilter } from '../product-material-filter'
import { ResetFiltersButton } from '../reset-filters-button'
import styles from './product-filters-bar.module.css'

export function ProductFiltersBar() {
  const { hasMetadataError, isPending } = useProductFiltersContext()

  return (
    <div
      className={cn(styles.bar, { [styles.pending]: isPending })}
      aria-busy={isPending}
    >
      <div className={styles.item}>
        <ProductSizeFilter />
      </div>

      <div className={cn(styles.item, styles.priceItem)}>
        <ProductPriceFilter />
      </div>

      <div className={styles.item}>
        <ProductColorFilter />
      </div>

      <div className={styles.item}>
        <ProductMaterialFilter />
      </div>

      <ResetFiltersButton />

      {hasMetadataError && (
        <div className={styles.message} role="status" aria-live="polite">
          Часть фильтров временно недоступна
        </div>
      )}
    </div>
  )
}
