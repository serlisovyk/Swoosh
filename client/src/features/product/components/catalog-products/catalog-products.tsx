'use client'

import cn from 'clsx'
import { Heading, Select, Skeleton } from '@shared/ui'
import { ProductCard } from '../product-card'
import { useGetProductsQuery } from '../../queries'
import styles from './catalog-products.module.css'

const SIZE_OPTIONS = [
  { label: '39 (EU)', value: '39' },
  { label: '41 (EU)', value: '41' },
  { label: '43 (EU)', value: '43' },
  { label: '45 (EU)', value: '45' },
]

const MATERIAL_OPTIONS = [
  { label: 'Текстиль', value: 'textile' },
  { label: 'Замша', value: 'suede' },
  { label: 'Кожа', value: 'leather' },
]

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

      <div>
        <Select
          id="size"
          label="Размер"
          options={SIZE_OPTIONS}
          defaultValue="45"
        />

        <Select
          id="material"
          label="Материал"
          options={MATERIAL_OPTIONS}
          defaultValue="leather"
        />
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
