import type {
  ProductPriceRange,
  ProductSortOption,
} from '@features/product/types'

export interface ProductFiltersState {
  size?: number
  price?: ProductPriceRange
  colorName?: string
  category?: string
  material?: string
  search?: string
  sort?: ProductSortOption
  limit?: number
  page?: number
}

export interface ProductFiltersContextValue {
  filters: ProductFiltersState
  filterMetadata: ProductFiltersMetadata
  selectedLimit: number
  selectedSort: ProductSortOption
  isPending: boolean
  hasMetadataError: boolean
  areMetadataFiltersDisabled: boolean
  hasActiveFilters: boolean
  setSize: (size?: number) => void
  setPrice: (price: ProductPriceRange, bounds: ProductPriceRange) => void
  setColorName: (colorName?: string) => void
  setMaterial: (material?: string) => void
  setSort: (sort?: ProductSortOption) => void
  setLimit: (limit?: number) => void
  setPage: (page?: number) => void
  resetFilters: () => void
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
  categories: ProductFilterCategory[]
  priceRange: ProductPriceRange
}

export type ProductFiltersMetadataResponse = ProductFiltersMetadata

export interface ProductFilterCategory {
  _id: string
  name: string
}
