import cn from 'clsx'
import { ProductDetailsPurchaseColorsProps } from '../../../../../../types'
import styles from './product-details-purchase-colors.module.css'

export function ProductDetailsPurchaseColors({
  colors,
  activeColorHex,
  onSelectColor,
}: ProductDetailsPurchaseColorsProps) {
  if (!colors.length) return null

  return (
    <div className={styles.optionBlock}>
      <div>
        <span className={styles.optionLabel}>Цвет:</span>
      </div>

      <div className={styles.colorsList}>
        {colors.map(({ name, hex }) => (
          <button
            key={`${name}-${hex}`}
            type="button"
            aria-label={name}
            aria-pressed={activeColorHex === hex}
            title={name}
            onClick={() => onSelectColor(hex)}
            className={cn(styles.colorButton, {
              [styles.colorButtonActive]: activeColorHex === hex,
            })}
          >
            <span
              className={styles.colorSwatch}
              style={{ backgroundColor: hex }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
