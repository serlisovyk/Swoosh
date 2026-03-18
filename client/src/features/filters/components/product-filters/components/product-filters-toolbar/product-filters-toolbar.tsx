'use client'

import cn from 'clsx'
import { useProductFiltersContext } from '../../../../context'
import { ProductLimitFilter } from '../product-limit-filter'
import { ProductSortFilter } from '../product-sort-filter'
import { ProductFiltersToolbarProps } from '../../../../types'
import styles from './product-filters-toolbar.module.css'

export function ProductFiltersToolbar({
  shownCount,
  totalCount,
  isUpdating,
}: ProductFiltersToolbarProps) {
  const { isPending } = useProductFiltersContext()

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapperPending]: isUpdating || isPending,
      })}
    >
      <div className={styles.total}>
        Показано {shownCount} из {totalCount} товаров
      </div>

      <div className={styles.controls}>
        <ProductLimitFilter />
        <ProductSortFilter />
      </div>
    </div>
  )
}
