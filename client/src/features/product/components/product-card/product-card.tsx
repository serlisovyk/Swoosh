'use client'

import Link from 'next/link'
import { useState } from 'react'
import cn from 'clsx'
import { ShoppingBasket } from 'lucide-react'
import { FavoriteToggleButton } from '@features/favorites'
import { Heading } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { formatProductPrice } from '../../utils'
import { ProductCardProps } from '../../types'
import { ProductBadge } from '../product-badge'
import styles from './product-card.module.css'

export function ProductCard({ product }: ProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const images = Array.isArray(product.images) ? product.images : []
  const colors = Array.isArray(product.colors) ? product.colors : []
  const activeImage = images[activeImageIndex] ?? ''

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <div className={styles.top}>
          <ProductBadge product={product} />

          <FavoriteToggleButton productId={product._id} />
        </div>

        <Link href={ROUTES.PRODUCT(product._id)} className={styles.imageFrame}>
          <div
            aria-label={product.title}
            className={styles.image}
            role="img"
            style={{ backgroundImage: `url("${activeImage}")` }}
          />
        </Link>

        <div className={styles.sliderDots}>
          {images.map((image, index) => (
            <button
              aria-label={`Показать изображение ${index + 1}`}
              className={cn(
                styles.dot,
                index === activeImageIndex && styles.dotActive,
              )}
              key={`${image}-${index}`}
              onClick={() => setActiveImageIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{product.category?.name}</div>

        <Heading as="h2" className={styles.title}>
          {product.title}
        </Heading>

        <div className={styles.colorsRow}>
          <span className={styles.colorsLabel}>Цвета:</span>

          <ul className={styles.colorsList}>
            {colors.map(({ name, hex }) => (
              <li key={`${name}-${hex}`}>
                <span
                  aria-label={name}
                  className={styles.colorSwatch}
                  style={{ backgroundColor: hex }}
                  title={name}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {formatProductPrice(product.price)}
            </span>

            {product.oldPrice && (
              <span className={styles.oldPrice}>
                {formatProductPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            aria-label="Добавить в корзину"
            className={styles.cartButton}
            type="button"
          >
            <ShoppingBasket size={24} />
          </button>
        </div>
      </div>
    </article>
  )
}
