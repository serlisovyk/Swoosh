import cn from 'clsx'
import { DEFAULT_PRODUCTS_LIMIT } from '@features/product/constants'
import { useProductFiltersContext } from '../../../../context'
import { PRODUCT_LIMIT_OPTIONS } from '../../../../constants'
import styles from './product-limit-filter.module.css'

export function ProductLimitFilter() {
  const { selectedLimit, setLimit } = useProductFiltersContext()

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Показывать по:</span>

      <div className={styles.buttons}>
        {PRODUCT_LIMIT_OPTIONS.map((option) => {
          const isButtonActive = selectedLimit === option

          const handleClick = () => {
            setLimit(option === DEFAULT_PRODUCTS_LIMIT ? undefined : option)
          }

          return (
            <button
              key={option}
              type="button"
              onClick={handleClick}
              className={cn(styles.button, {
                [styles.buttonActive]: isButtonActive,
              })}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
