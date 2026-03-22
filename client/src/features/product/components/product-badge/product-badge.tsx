import cn from 'clsx'
import type { ProductBadgeProps } from '../../types'
import { getProductBadge } from '../../utils'
import styles from './product-badge.module.css'

export function ProductBadge({ product }: ProductBadgeProps) {
  const badge = getProductBadge(product)

  if (!badge) return null

  return (
    <span className={cn(styles.badge, styles[`badge-${badge.tone}`])}>
      {badge.text}
    </span>
  )
}
