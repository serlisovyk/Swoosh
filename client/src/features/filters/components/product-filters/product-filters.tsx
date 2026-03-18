import { ProductFiltersProvider } from '../../context'
import { ProductFiltersBar } from './components/product-filters-bar'
import { ProductFiltersToolbar } from './components/product-filters-toolbar'
import { ProductFiltersProps } from '../../types'
import styles from './product-filters.module.css'

export function ProductFilters({
  shownCount,
  totalCount,
  isUpdating = false,
}: ProductFiltersProps) {
  return (
    <ProductFiltersProvider>
      <section className={styles.wrapper}>
        <ProductFiltersBar />

        <ProductFiltersToolbar
          isUpdating={isUpdating}
          shownCount={shownCount}
          totalCount={totalCount}
        />
      </section>
    </ProductFiltersProvider>
  )
}
