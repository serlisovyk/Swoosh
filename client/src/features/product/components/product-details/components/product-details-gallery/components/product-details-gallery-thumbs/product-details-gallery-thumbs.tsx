import cn from 'clsx'
import { ProductDetailsGalleryThumbsProps } from '../../../../../../types'
import styles from './product-details-gallery-thumbs.module.css'

export function ProductDetailsGalleryThumbs({
  images,
  activeImageIndex,
  onImageSelect,
}: ProductDetailsGalleryThumbsProps) {
  if (images.length <= 1) return null

  return (
    <div className={styles.thumbsGrid}>
      {images.map((image, index) => (
        <button
          key={`${image}-${index}`}
          type="button"
          aria-label={`Показать изображение ${index + 1}`}
          aria-pressed={index === activeImageIndex}
          className={cn(styles.thumbButton, {
            [styles.thumbButtonActive]: index === activeImageIndex,
          })}
          onClick={() => onImageSelect(index)}
        >
          <div
            className={styles.thumbImage}
            style={{ backgroundImage: `url("${image}")` }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  )
}
