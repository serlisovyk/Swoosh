'use client'

import cn from 'clsx'
import { ProductFilters } from '@features/filters'
import { Heading, Skeleton } from '@shared/ui'
import { ProductCard } from '../product-card'
import { useGetProductsQuery } from '../../queries'
import styles from './catalog-products.module.css'

export function CatalogProducts() {
  const { products, total, isLoading, isFetching, error } =
    useGetProductsQuery()

  const isEmpty = !isLoading && !error && !products.length

  return (
    <div className={cn(styles.wrapper, 'container')}>
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
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
