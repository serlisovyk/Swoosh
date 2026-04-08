'use client'

import { Carousel } from '@shared/ui'
import { ProductCard } from '../../../product-card'
import { ProductCardSkeleton } from '../../../product-card-skeleton'
import type { ProductDetailsProductsCarouselSectionProps } from '../../../../types'
import styles from './product-details-products-carousel-section.module.css'

const SKELETON_ITEMS = [0, 1, 2, 3]

export function ProductDetailsProductsCarouselSection({
  title,
  products,
  isLoading,
  error,
}: ProductDetailsProductsCarouselSectionProps) {
  if (!isLoading && !error && !products.length) return null

  if (isLoading) {
    return (
      <Carousel
        title={title}
        ariaLabel={title}
        variant="contained"
        items={SKELETON_ITEMS}
        getItemKey={(item) => String(item)}
        isInteractive={false}
        renderItem={() => <ProductCardSkeleton count={1} />}
      />
    )
  }

  if (error && !products.length) {
    return (
      <section className={styles.errorSection}>
        <div className="container">
          <h2 className={styles.errorTitle}>{title}</h2>

          <p className={styles.errorMessage}>
            Не удалось загрузить подборку товаров.
          </p>
        </div>
      </section>
    )
  }

  return (
    <Carousel
      title={title}
      ariaLabel={title}
      variant="contained"
      items={products}
      getItemKey={(product) => product._id}
      renderItem={(product) => <ProductCard product={product} />}
    />
  )
}
