'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { ProductBadge } from '../../../product-badge'
import { ProductDetailsGalleryThumbs } from './components/product-details-gallery-thumbs'
import type { ProductDetailsGalleryProps } from '../../../../types'
import styles from './product-details-gallery.module.css'

export function ProductDetailsGallery({ product }: ProductDetailsGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const images = Array.isArray(product.images) ? product.images : []
  const activeImage = images[activeImageIndex] ?? images[0] ?? ''

  return (
    <section className={styles.gallery} aria-label="Галерея товара">
      <div className={styles.mainMedia}>
        <div className={styles.mediaTop}>
          <ProductBadge product={product} />

          <button
            type="button"
            aria-label="Добавить в избранное"
            className={styles.favoriteButton}
          >
            <Heart size={22} />
          </button>
        </div>

        {activeImage ? (
          <div
            role="img"
            aria-label={product.title}
            className={styles.mainImage}
            style={{ backgroundImage: `url("${activeImage}")` }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>Изображение недоступно</div>
        )}
      </div>

      <ProductDetailsGalleryThumbs
        images={images}
        activeImageIndex={activeImageIndex}
        onImageSelect={setActiveImageIndex}
      />
    </section>
  )
}
