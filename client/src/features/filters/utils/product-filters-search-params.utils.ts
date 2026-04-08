import type {
  ProductPriceRange,
} from '@features/product/types'
import { normalizeProductsPage } from '@features/product/utils'
import {
  createSerializer,
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsNumberLiteral,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
} from 'nuqs/server'
import {
  PRODUCT_LIMIT_OPTIONS,
  PRODUCT_SORT_VALUES,
} from '../constants'
import type { ProductFiltersState } from '../types'

export const productFiltersSearchParams = {
  size: parseAsInteger,
  price: parseAsNativeArrayOf(parseAsInteger),
  colorName: parseAsString,
  category: parseAsString,
  material: parseAsString,
  sort: parseAsStringLiteral(PRODUCT_SORT_VALUES),
  limit: parseAsNumberLiteral(PRODUCT_LIMIT_OPTIONS),
  page: parseAsInteger,
}

type ProductFiltersSearchParamsState = inferParserType<
  typeof productFiltersSearchParams
>

const serializeProductFilters = createSerializer(productFiltersSearchParams)

export function normalizeProductFiltersSearchState(
  filters: ProductFiltersSearchParamsState,
): ProductFiltersState {
  return {
    size: filters.size ?? undefined,
    price: normalizeProductPriceRangeValue(filters.price),
    colorName: normalizeStringFilterValue(filters.colorName),
    category: normalizeStringFilterValue(filters.category),
    material: normalizeStringFilterValue(filters.material),
    sort: filters.sort ?? undefined,
    limit: normalizeProductLimitValue(filters.limit),
    page: normalizeProductsPage(filters.page ?? undefined),
  }
}

export function createProductFiltersHref(
  pathname: string,
  rawSearchParams: string,
  filters: ProductFiltersState,
) {
  return serializeProductFilters(
    buildProductFiltersBase(pathname, rawSearchParams),
    buildProductFiltersSearchParamsUpdate(filters),
  )
}

export function createProductsPaginationHref(
  pathname: string,
  rawSearchParams: string,
  page?: number,
) {
  return serializeProductFilters(
    buildProductFiltersBase(pathname, rawSearchParams),
    { page: normalizeProductsPage(page) ?? null },
  )
}

export function getProductsPaginationCorrectionHref(
  pathname: string,
  rawSearchParams: string,
  currentPage: number,
  totalPages: number,
) {
  const lastAvailablePage = totalPages > 0 ? totalPages : 1

  if (currentPage <= lastAvailablePage) {
    return null
  }

  return createProductsPaginationHref(
    pathname,
    rawSearchParams,
    lastAvailablePage,
  )
}

export function buildProductFiltersSearchParamsUpdate(
  filters: ProductFiltersState,
) {
  return {
    size: filters.size ?? null,
    price: filters.price ?? null,
    colorName: filters.colorName ?? null,
    category: filters.category ?? null,
    material: filters.material ?? null,
    sort: filters.sort ?? null,
    limit: normalizeProductLimitValue(filters.limit) ?? null,
    page: normalizeProductsPage(filters.page) ?? null,
  }
}

function buildProductFiltersBase(pathname: string, rawSearchParams: string) {
  return rawSearchParams ? `${pathname}?${rawSearchParams}` : pathname
}

function normalizeStringFilterValue(value: string | null) {
  const normalizedValue = value?.trim()

  return normalizedValue ? normalizedValue : undefined
}

export function normalizeProductLimitValue(value?: number | null) {
  return PRODUCT_LIMIT_OPTIONS.find((option) => option === value)
}

function normalizeProductPriceRangeValue(
  value?: readonly number[] | null,
): ProductPriceRange | undefined {
  if (!value?.length) return undefined

  const numbers = value.filter((item) => Number.isInteger(item))

  if (!numbers.length) return undefined

  const [minPrice, maxPrice = numbers[0]] = numbers
    .slice(0, 2)
    .sort((left, right) => left - right)

  return [minPrice, maxPrice]
}
