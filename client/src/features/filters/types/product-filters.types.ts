import type {
  ProductPriceRange,
  ProductSortOption,
} from '@features/product/types'
import { useProductFilters } from '../hooks'

export type ProductFiltersContextValue = ReturnType<
  typeof useProductFilters
> | null

export interface ProductFiltersState {
  size?: number
  price?: ProductPriceRange
  colorName?: string
  material?: string
  sort?: ProductSortOption
  limit?: number
  page?: number
}

export interface ProductFiltersQueryInput {
  size?: string[]
  price?: string[]
  colorName?: string[]
  material?: string[]
  sort?: string | null
  limit?: string[]
  page?: string[]
}

export interface ProductFiltersProps {
  shownCount: number
  totalCount: number
  isUpdating?: boolean
}

export interface ProductFiltersToolbarProps {
  shownCount: number
  totalCount: number
  isUpdating: boolean
}

export interface ProductFilterOption {
  label: string
  value: string | number
}

export interface ProductFiltersMetadata {
  sizes: number[]
  materials: string[]
  colors: string[]
  priceRange: ProductPriceRange
}

export interface ProductFiltersMetadataResponse {
  sizes: number[]
  materials: string[]
  colors: string[]
  priceRange: ProductPriceRange
}
