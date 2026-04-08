'use client'

import {
  ProductCard,
  ProductCardSkeleton,
  useGetProductsQuery,
} from '@features/product'
import { Carousel } from '@shared/ui'
import type { HomeProductsCarouselSectionProps } from '../../../../types'
import styles from './home-products-carousel-section.module.css'

const SKELETON_ITEMS = [0, 1, 2, 3]

export function HomeProductsCarouselSection({
  title,
  query,
  variant,
}: HomeProductsCarouselSectionProps) {
  const { products, error, isLoading } = useGetProductsQuery(query)

  if (!isLoading && !error && !products.length) return null

  if (isLoading) {
    return (
      <Carousel
        title={title}
        ariaLabel={title}
        variant={variant}
        items={SKELETON_ITEMS}
        getItemKey={(item) => String(item)}
        isInteractive={false}
        renderItem={() => <ProductCardSkeleton count={1} />}
      />
    )
  }

  if (error) {
    return (
      <section className={styles.errorSection}>
        <div className="container">
          <div className={styles.errorHeader}>
            <h2 className={styles.errorTitle}>{title}</h2>
          </div>

          <p className={styles.errorMessage}>Не удалось загрузить подборку.</p>
        </div>
      </section>
    )
  }

  return (
    <Carousel
      title={title}
      ariaLabel={title}
      variant={variant}
      items={products}
      getItemKey={(product) => product._id}
      renderItem={(product) => <ProductCard product={product} />}
    />
  )
}
