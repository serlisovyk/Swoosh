import { ReactNode } from 'react'
import { Product } from '@features/product'

export interface FavoritesStateResponse {
  favoriteProductIds: string[]
  total: number
}

export interface FavoriteProductsResponse {
  products: Product[]
  total: number
}

export interface FavoriteToggleButtonProps {
  productId: string
  className?: string
  size?: number
}

export interface FavoritesProviderProps {
  children: ReactNode
}
