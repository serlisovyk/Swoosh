'use client'

import { useRef } from 'react'
import { Heading } from '@shared/ui'
import { ProductDescriptionPreview } from '../product-description-preview'
import { ProductDetailsPurchase } from '../product-details-purchase'
import { ProductDetailsTabs } from '../product-details-tabs'
import type { ProductDetailsInfoProps } from '../../../../types'
import styles from './product-details-info.module.css'

export function ProductDetailsInfo({ product }: ProductDetailsInfoProps) {
  const tabsRef = useRef<HTMLDivElement | null>(null)

  const handleShowFullDescription = () => {
    tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className={styles.info}>
      <Heading as="h1" className={styles.title}>
        {product.title}
      </Heading>

      <ProductDescriptionPreview
        description={product.description}
        onShowFullDescription={handleShowFullDescription}
      />

      <ProductDetailsPurchase product={product} />

      <ProductDetailsTabs ref={tabsRef} product={product} />
    </section>
  )
}
