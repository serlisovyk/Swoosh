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
  const { isPending } = useProductFiltersContext()

  const filters = [
    <ProductSizeFilter key="size" />,
    <ProductPriceFilter key="price" />,
    <ProductColorFilter key="color" />,
    <ProductMaterialFilter key="material" />,
  ]

  return (
    <section className={cn(styles.bar, { [styles.pending]: isPending })}>
      {filters.map((filter) => (
        <div
          key={filter.key}
          className={cn(styles.item, {
            [styles.priceItem]: filter.key === 'price',
          })}
        >
          {filter}
        </div>
      ))}

      <ResetFiltersButton />
    </section>
  )
}
