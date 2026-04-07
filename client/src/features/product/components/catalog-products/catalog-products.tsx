'use client'

import { ProductFilters } from '@features/filters'
import { Breadcrumbs, Heading, List, Pagination } from '@shared/ui'
import { useCatalogPagination } from '../../hooks/use-catalog-pagination.hook'
import { ProductCard } from '../product-card'
import { ProductCardSkeleton } from '../product-card-skeleton'
import { useGetProductsQuery } from '../../queries'
import { CATALOG_BREADCRUMBS } from '../../constants'
import styles from './catalog-products.module.css'

export function CatalogProducts() {
  const {
    products,
    total,
    currentPage,
    totalPages,
    isLoading,
    isFetching,
    error,
  } = useGetProductsQuery()

  const { getPageHref } = useCatalogPagination({
    currentPage,
    totalPages,
    isLoading,
    isFetching,
    hasError: Boolean(error),
  })

  const isEmpty = !isLoading && !error && !products.length

  return (
    <div className="container">
      <Breadcrumbs items={CATALOG_BREADCRUMBS} />

      <div className={styles.wrapper}>
        <Heading className={styles.heading} as="h1">
          Каталог
        </Heading>

        <ProductFilters
          isUpdating={isFetching}
          shownCount={products.length}
          totalCount={total}
        />

        <div className={styles.content}>
          {error && (
            <div className={styles.error}>Не удалось загрузить каталог.</div>
          )}

          {isLoading && (
            <ProductCardSkeleton className={styles.grid} count={6} />
          )}

          {isEmpty && <div className={styles.empty}>Ничего не найдено</div>}

          {!isLoading && !error && !!products.length && (
            <List
              items={products}
              className={styles.grid}
              getItemKey={(product) => product._id}
              renderItem={(product) => <ProductCard product={product} />}
            />
          )}

          {!error && !!products.length && (
            <Pagination
              className={styles.pagination}
              currentPage={currentPage}
              totalPages={totalPages}
              getPageHref={getPageHref}
            />
          )}
        </div>
      </div>
    </div>
  )
}
