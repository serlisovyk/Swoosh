'use client'

import { prepareDescriptionText } from '../../../../utils'
import { ProductDescriptionPreviewProps } from '../../../../types'
import styles from './product-description-preview.module.css'

export function ProductDescriptionPreview({
  description,
  onShowFullDescription,
}: ProductDescriptionPreviewProps) {
  const { previewText, shouldShowFullDescription } =
    prepareDescriptionText(description)

  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>{previewText}</p>

      {shouldShowFullDescription && (
        <button
          type="button"
          className={styles.button}
          onClick={onShowFullDescription}
        >
          Полное описание
        </button>
      )}
    </div>
  )
}
