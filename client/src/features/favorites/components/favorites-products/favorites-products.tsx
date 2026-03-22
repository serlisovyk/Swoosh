'use client'

import { ProductCard } from '@features/product'
import { Breadcrumbs, Heading, List, Skeleton } from '@shared/ui'
import { FavoritesEmpty } from '../favorites-empty'
import { useFavoriteProductsQuery } from '../../queries'
import { useFavoriteProductIds, useFavoritesHydrated } from '../../store'
import { FAVORITES_BREADCRUMBS } from '../../constants'
import styles from './favorites-products.module.css'

export function FavoritesProducts() {
  const { products, isLoading, error } = useFavoriteProductsQuery()

  const favoriteProductIds = useFavoriteProductIds()
  const hasHydrated = useFavoritesHydrated()

  const hasFavorites = favoriteProductIds.length > 0

  const isEmpty = hasHydrated && !hasFavorites && !isLoading
  const isInitialLoading = !hasHydrated || (isLoading && hasFavorites)

  return (
    <div className="container">
      <Breadcrumbs items={FAVORITES_BREADCRUMBS} />

      <div className={styles.wrapper}>
        <Heading className={styles.heading} as="h1">
          Избранные товары
        </Heading>

        {error && (
          <div className={styles.error}>
            Не удалось загрузить избранные товары.
          </div>
        )}

        {isInitialLoading && <Skeleton count={6} />}

        {isEmpty && <FavoritesEmpty />}

        {!isInitialLoading && !error && !!products.length && (
          <List
            items={products}
            className={styles.grid}
            getItemKey={(product) => product._id}
            renderItem={(product) => <ProductCard product={product} />}
          />
        )}
      </div>
    </div>
  )
}
