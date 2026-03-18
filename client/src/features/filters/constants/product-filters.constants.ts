import type { ProductPriceRange, ProductSortOption } from '@features/product'
import type { ProductFilterOption, ProductFiltersMetadata } from '../types'

export const PRODUCT_FILTER_ALL_VALUE = '__all__'

export const PRODUCT_DEFAULT_PRICE_RANGE: ProductPriceRange = [0, 1000]

export const PRODUCT_LIMIT_OPTIONS = [9, 12, 18, 24] as const

export const PRODUCT_DEFAULT_LIMIT = 18

export const PRODUCT_DEFAULT_SORT: ProductSortOption = 'newest'

export const PRODUCT_SORT_VALUES = [
  'newest',
  'oldest',
  'priceAsc',
  'priceDesc',
] as const satisfies readonly ProductSortOption[]

export const PRODUCT_SORT_OPTIONS: ProductFilterOption[] = [
  {
    label: 'Сначала новые',
    value: 'newest',
  },
  {
    label: 'Сначала старые',
    value: 'oldest',
  },
  {
    label: 'Цена по возрастанию',
    value: 'priceAsc',
  },
  {
    label: 'Цена по убыванию',
    value: 'priceDesc',
  },
]

export const PRODUCT_FILTER_QUERY_KEYS = [
  'size',
  'price',
  'colorName',
  'material',
  'sort',
  'limit',
] as const

export const EMPTY_PRODUCT_FILTERS_METADATA: ProductFiltersMetadata = {
  sizes: [],
  materials: [],
  colors: [],
  priceRange: PRODUCT_DEFAULT_PRICE_RANGE,
}
