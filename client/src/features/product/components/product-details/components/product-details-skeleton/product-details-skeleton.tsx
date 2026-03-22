import { Skeleton } from '@shared/ui'
import styles from './product-details-skeleton.module.css'

export function ProductDetailsSkeleton() {
  return (
    <div className={styles.layout}>
      <div className={styles.gallery}>
        <Skeleton className={styles.mainImage} />

        <div className={styles.thumbGrid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className={styles.thumb} />
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <Skeleton className={styles.title} />
        <Skeleton className={styles.line} />
        <Skeleton className={styles.lineShort} />

        <div className={styles.colors}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className={styles.color} />
          ))}
        </div>

        <div className={styles.sizes}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className={styles.size} />
          ))}
        </div>

        <Skeleton className={styles.price} />
        <Skeleton className={styles.action} />
      </div>
    </div>
  )
}
