'use client'

import cn from 'clsx'
import { Heading, Skeleton } from '@shared/ui'
import { ProductCard } from '../product-card'
import { useGetProductsQuery } from '../../queries'
import styles from './catalog-products.module.css'

// TODO: update isLoading, error and
// empty states - create separate components for them
export function CatalogProducts() {
  const { products, isLoading, error } = useGetProductsQuery()

  if (isLoading) return <Skeleton count={3} />

  if (error) return <div>Не удалось загрузить каталог</div>

  if (!products.length) return <div>Каталог пока пуст</div>

  return (
    <div className={cn(styles.wrapper, 'container')}>
      <Heading as="h1" className={styles.heading}>
        Каталог товаров
      </Heading>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
