import { Skeleton } from '@shared/ui'
import { ProductCardSkeletonProps } from '../../types'
import styles from './product-card-skeleton.module.css'

export function ProductCardSkeleton({
  count = 1,
  className,
}: ProductCardSkeletonProps) {
  return (
    <div aria-hidden="true" className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <article className={styles.card} key={index}>
          <div className={styles.media}>
            <div className={styles.top}>
              <Skeleton className={styles.badge} />
              <Skeleton className={styles.favoriteButton} />
            </div>

            <Skeleton className={styles.image} />

            <div className={styles.sliderDots}>
              {Array.from({ length: 3 }).map((_, dotIndex) => (
                <Skeleton className={styles.dot} key={dotIndex} />
              ))}
            </div>
          </div>

          <div className={styles.content}>
            <Skeleton className={styles.category} />
            <Skeleton className={styles.title} />

            <div className={styles.colorsRow}>
              <Skeleton className={styles.colorsLabel} />

              <div className={styles.colorsList}>
                {Array.from({ length: 4 }).map((_, colorIndex) => (
                  <Skeleton className={styles.color} key={colorIndex} />
                ))}
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.priceContainer}>
                <Skeleton className={styles.price} />
                <Skeleton className={styles.oldPrice} />
              </div>

              <Skeleton className={styles.cartButton} />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
