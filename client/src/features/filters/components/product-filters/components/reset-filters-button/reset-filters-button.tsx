import { X } from 'lucide-react'
import { useProductFiltersContext } from '../../../../context'
import styles from './reset-filters-button.module.css'

export function ResetFiltersButton() {
  const { resetFilters } = useProductFiltersContext()

  return (
    <button type="button" className={styles.resetButton} onClick={resetFilters}>
      <X aria-hidden="true" size={16} />
      <span>Сбросить все</span>
    </button>
  )
}
