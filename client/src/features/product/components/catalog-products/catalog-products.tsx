'use client'

import { ProductFilters, useProductFilterParams } from '@features/filters'
import { Breadcrumbs, Heading, List, Pagination } from '@shared/ui'
import { useCatalogPagination } from '../../hooks/use-catalog-pagination.hook'
import { useGetProductsQuery } from '../../queries'
import { CATALOG_BREADCRUMBS } from '../../constants'
import { createCatalogSearchHref } from '../../utils'
import { CatalogSearchEmptyState } from '../catalog-search-empty-state'
import { ProductCard } from '../product-card'
import { ProductCardSkeleton } from '../product-card-skeleton'
import styles from './catalog-products.module.css'

export function CatalogProducts() {
  const productParams = useProductFilterParams()
  const searchQuery = productParams.search

  const {
    products,
    total,
    currentPage,
    totalPages,
    isLoading,
    isFetching,
    error,
  } = useGetProductsQuery(productParams)

  const { getPageHref } = useCatalogPagination({
    currentPage,
    totalPages,
    isLoading,
    isFetching,
    hasError: Boolean(error),
  })

  const isSearchEmptyState =
    Boolean(searchQuery) && !isLoading && !error && !products.length
  const isEmpty = !searchQuery && !isLoading && !error && !products.length
  const breadcrumbs = searchQuery
    ? [{ label: 'Поиск по каталогу', href: createCatalogSearchHref(searchQuery) }]
    : CATALOG_BREADCRUMBS
  const heading = searchQuery
    ? `Результаты поиска “${searchQuery}”`
    : 'Каталог'

  return (
    <div className="container">
      <Breadcrumbs items={breadcrumbs} />

      <div className={styles.wrapper}>
        <Heading className={styles.heading} as="h1">
          {heading}
        </Heading>

        {!isSearchEmptyState && (
          <ProductFilters
            isUpdating={isFetching}
            shownCount={products.length}
            totalCount={total}
          />
        )}

        <div className={styles.content}>
          {error && (
            <div className={styles.error}>Не удалось загрузить каталог.</div>
          )}

          {isLoading && (
            <ProductCardSkeleton className={styles.grid} count={6} />
          )}

          {isEmpty && <div className={styles.empty}>Ничего не найдено</div>}

          {isSearchEmptyState && (
            <CatalogSearchEmptyState searchQuery={searchQuery ?? ''} />
          )}

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
