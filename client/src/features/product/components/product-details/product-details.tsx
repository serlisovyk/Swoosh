'use client'

import { useRouter } from 'next/navigation'
import cn from 'clsx'
import { toast } from 'sonner'
import { ROUTES } from '@shared/config'
import { useGetProductByIdQuery } from '../../queries'
import { ProductDetailsSkeleton } from './components/product-details-skeleton'
import { ProductDetailsGallery } from './components/product-details-gallery'
import { ProductDetailsInfo } from './components/product-details-info'
import type { ProductDetailsProps } from '../../types'
import styles from './product-details.module.css'

export function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter()

  const { product, isLoading, error } = useGetProductByIdQuery(productId)

  if (isLoading) {
    return (
      <div className={cn(styles.wrapper, 'container', styles.state)}>
        <ProductDetailsSkeleton />
      </div>
    )
  }

  if (error) {
    toast.error('Не удалось загрузить товар.')
    router.replace(ROUTES.CATALOG)
    return null
  }

  if (!product) {
    toast.error('Товар не найден.')
    router.replace(ROUTES.CATALOG)
    return null
  }

  return (
    <div className={cn(styles.wrapper, 'container')}>
      <div className={styles.layout}>
        <ProductDetailsGallery product={product} />
        <ProductDetailsInfo product={product} />
      </div>
    </div>
  )
}
