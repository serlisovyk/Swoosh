import { AlertCircle, MoveRight } from 'lucide-react'
import { ROUTES } from '@shared/config'
import { Button } from '@shared/ui'
import type { CatalogSearchEmptyStateProps } from '../../types'
import { CatalogSearchForm } from '../catalog-search-form'
import styles from './catalog-search-empty-state.module.css'

export function CatalogSearchEmptyState({
  searchQuery,
}: CatalogSearchEmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notice}>
        <AlertCircle
          className={styles.noticeIcon}
          size={20}
          aria-hidden="true"
        />

        <p className={styles.noticeText}>
          По вашему запросу ничего не найдено. Проверьте правильность ввода или
          попробуйте уточнить поиск.
        </p>
      </div>

      <CatalogSearchForm className={styles.search} defaultValue={searchQuery} />

      <Button href={ROUTES.CATALOG} icon={MoveRight} className={styles.button}>
        Перейти в каталог
      </Button>
    </div>
  )
}
