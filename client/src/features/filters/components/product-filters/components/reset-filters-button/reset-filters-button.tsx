import cn from 'clsx'
import { X } from 'lucide-react'
import { useProductFiltersContext } from '../../../../context'
import styles from './reset-filters-button.module.css'

export function ResetFiltersButton() {
  const { hasActiveFilters, isPending, resetFilters } = useProductFiltersContext()

  return (
    <button
      type="button"
      disabled={!hasActiveFilters || isPending}
      className={cn(styles.resetButton, {
        [styles.resetButtonDisabled]: !hasActiveFilters || isPending,
      })}
      onClick={resetFilters}
    >
      <X aria-hidden="true" size={16} />
      <span>Сбросить все</span>
    </button>
  )
}
