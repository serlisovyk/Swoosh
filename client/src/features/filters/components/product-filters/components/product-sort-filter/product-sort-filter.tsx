import { ProductSortOption } from '@features/product'
import { Select } from '@shared/form'
import { useProductFiltersContext } from '../../../../context'
import { isProductSortOption } from '../../../../utils'
import {
  PRODUCT_DEFAULT_SORT,
  PRODUCT_SORT_OPTIONS,
} from '../../../../constants'
import styles from './product-sort-filter.module.css'

export function ProductSortFilter() {
  const { selectedSort, setSort } = useProductFiltersContext()

  const handleSortChange = (value: string | number) => {
    const nextValue = String(value)

    if (!isProductSortOption(nextValue)) return

    const normalizedSort: ProductSortOption | undefined =
      nextValue === PRODUCT_DEFAULT_SORT ? undefined : nextValue

    setSort(normalizedSort)
  }

  return (
    <div className={styles.sort}>
      <span className={styles.label}>Сортировка:</span>

      <div className={styles.wrapper}>
        <Select
          id="product-sort"
          aria-label="Сортировка каталога"
          className={styles.select}
          options={PRODUCT_SORT_OPTIONS}
          value={selectedSort}
          onValueChange={handleSortChange}
        />
      </div>
    </div>
  )
}
