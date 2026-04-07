import {
  createProductsSearchParams,
  normalizeProductsPage,
} from '@features/product/utils'
import type {
  GetProductsParams,
  ProductPriceRange,
  ProductSortOption,
} from '@features/product/types'
import {
  EMPTY_PRODUCT_FILTERS_METADATA,
  PRODUCT_FILTER_QUERY_KEYS,
  PRODUCT_LIMIT_OPTIONS,
  PRODUCT_SORT_VALUES,
} from '../constants'
import type {
  ProductFiltersMetadata,
  ProductFiltersMetadataResponse,
  ProductFiltersState,
} from '../types'

export function buildProductQueryParams(
  filters: ProductFiltersState,
): GetProductsParams {
  return {
    size: filters.size !== undefined ? [filters.size] : undefined,
    price: filters.price,
    colorName: filters.colorName ? [filters.colorName] : undefined,
    category: filters.category ? [filters.category] : undefined,
    material: filters.material ? [filters.material] : undefined,
    sort: filters.sort,
    limit: filters.limit,
    page: normalizeProductsPage(filters.page),
  }
}

export function createProductFiltersUrl(
  pathname: string,
  rawSearchParams: string,
  filters: ProductFiltersState,
) {
  const nextSearchParams = new URLSearchParams(rawSearchParams)

  PRODUCT_FILTER_QUERY_KEYS.forEach((key) => nextSearchParams.delete(key))

  createProductsSearchParams(buildProductQueryParams(filters)).forEach(
    (value, key) => nextSearchParams.append(key, value),
  )

  const nextQueryString = nextSearchParams.toString()

  return nextQueryString ? `${pathname}?${nextQueryString}` : pathname
}

export function mapProductFiltersMetadata(
  metadata: ProductFiltersMetadataResponse,
): ProductFiltersMetadata {
  if (
    !metadata.sizes.length &&
    !metadata.materials.length &&
    !metadata.colors.length &&
    !metadata.categories.length
  ) {
    return EMPTY_PRODUCT_FILTERS_METADATA
  }

  return {
    sizes: [...new Set(metadata.sizes)].sort((left, right) => left - right),
    materials: createSortedValues(metadata.materials),
    colors: createSortedValues(metadata.colors),
    categories: createSortedCategories(metadata.categories),
    priceRange: normalizeRange(metadata.priceRange),
  }
}

export function normalizeProductPriceRange(
  priceRange: ProductPriceRange,
  bounds: ProductPriceRange,
) {
  const [minBound, maxBound] = normalizeRange(bounds)
  const [minPrice, maxPrice] = normalizeRange(priceRange)

  const normalizedRange: ProductPriceRange = [
    Math.max(minBound, minPrice),
    Math.min(maxBound, Math.max(minPrice, maxPrice)),
  ]

  if (normalizedRange[0] === minBound && normalizedRange[1] === maxBound) {
    return undefined
  }

  return normalizedRange
}

function createSortedValues<T extends string | number>(values: T[]) {
  return [...new Set(values)].sort((left, right) => {
    if (typeof left === 'number' && typeof right === 'number') {
      return left - right
    }

    return String(left).localeCompare(String(right))
  })
}

function createSortedCategories(categories: ProductFiltersMetadata['categories']) {
  return [...categories].sort((left, right) => {
    return left.name.localeCompare(right.name)
  })
}

function normalizeRange([start, end]: ProductPriceRange): ProductPriceRange {
  return start <= end ? [start, end] : [end, start]
}

export function isProductSortOption(value: string): value is ProductSortOption {
  return PRODUCT_SORT_VALUES.some((option) => option === value)
}

export function isProductLimitOption(
  value: number,
): value is (typeof PRODUCT_LIMIT_OPTIONS)[number] {
  return PRODUCT_LIMIT_OPTIONS.some((option) => option === value)
}

export function resetProductFiltersPage(
  filters: ProductFiltersState,
): ProductFiltersState {
  if (!filters.page) return filters

  return {
    ...filters,
    page: undefined,
  }
}
