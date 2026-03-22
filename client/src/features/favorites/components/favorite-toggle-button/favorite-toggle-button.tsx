'use client'

import cn from 'clsx'
import { Heart } from 'lucide-react'
import { useFavoriteToggle } from '../../queries'
import { FavoriteToggleButtonProps } from '../../types'
import styles from './favorite-toggle-button.module.css'

export function FavoriteToggleButton({
  productId,
  className,
  size = 24,
}: FavoriteToggleButtonProps) {
  const { isFavorite, isLoading, toggleFavorite } = useFavoriteToggle(productId)

  return (
    <button
      type="button"
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      className={cn(styles.button, className, isFavorite && styles.active)}
      disabled={isLoading}
      onClick={toggleFavorite}
    >
      <Heart size={size} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  )
}
