'use client'

import { ProductFilters } from '@features/filters'
import { Breadcrumbs, Heading, List, Skeleton } from '@shared/ui'
import { ProductCard } from '../product-card'
import { useGetProductsQuery } from '../../queries'
import { CATALOG_BREADCRUMBS } from '../../constants'
import styles from './catalog-products.module.css'

export function CatalogProducts() {
  const { products, total, isLoading, isFetching, error } =
    useGetProductsQuery()

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

        <div>
          {error && (
            <div className={styles.error}>Не удалось загрузить каталог.</div>
          )}

          {isLoading && <Skeleton count={6} />}

          {isEmpty && <div className={styles.empty}>Ничего не найдено</div>}

          {!isLoading && !error && !!products.length && (
            <List
              items={products}
              className={styles.grid}
              getItemKey={(product) => product._id}
              renderItem={(product) => <ProductCard product={product} />}
            />
          )}
        </div>
      </div>
    </div>
  )
}
