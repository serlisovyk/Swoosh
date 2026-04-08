'use client'

import { useEffect, useRef, useTransition } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryStates } from 'nuqs'
import { DEFAULT_PRODUCTS_LIMIT } from '@features/product/constants'
import { normalizeProductsPage } from '@features/product/utils'
import type {
  ProductPriceRange,
  ProductSortOption,
} from '@features/product/types'
import { PRODUCT_DEFAULT_SORT } from '../constants'
import {
  buildProductFiltersSearchParamsUpdate,
  createProductFiltersHref,
  hasActiveProductFilters,
  normalizeProductLimitValue,
  normalizeProductFiltersSearchState,
  normalizeProductPriceRange,
  productFiltersSearchParams,
} from '../utils'

export function useProductFilters() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasResolvedInitialUrlRef = useRef(false)

  const [isPending, startTransition] = useTransition()

  const [queryFilters, setQueryFilters] = useQueryStates(
    productFiltersSearchParams,
    {
      scroll: false,
      shallow: true,
      startTransition,
    },
  )

  const rawSearchParams = searchParams.toString()
  const currentUrl = rawSearchParams
    ? `${pathname}?${rawSearchParams}`
    : pathname

  const filters = normalizeProductFiltersSearchState(queryFilters)
  const canonicalQueryFilters = buildProductFiltersSearchParamsUpdate(filters)
  const canonicalUrl = createProductFiltersHref(
    pathname,
    rawSearchParams,
    filters,
  )

  useEffect(() => {
    if (hasResolvedInitialUrlRef.current) {
      return
    }

    hasResolvedInitialUrlRef.current = true

    if (canonicalUrl === currentUrl) {
      return
    }

    void setQueryFilters(canonicalQueryFilters)
  }, [canonicalQueryFilters, canonicalUrl, currentUrl, setQueryFilters])

  const setSize = (size?: number) =>
    void setQueryFilters({ size: size ?? null, page: null })

  const setMaterial = (material?: string) =>
    void setQueryFilters({ material: material ?? null, page: null })

  const setSort = (sort?: ProductSortOption) =>
    void setQueryFilters({ sort: sort ?? null, page: null })

  const setLimit = (limit?: number) =>
    void setQueryFilters({
      limit: normalizeProductLimitValue(limit) ?? null,
      page: null,
    })

  const setColorName = (colorName?: string) => {
    void setQueryFilters({ colorName: colorName ?? null, page: null })
  }

  const setPrice = (price: ProductPriceRange, bounds: ProductPriceRange) => {
    void setQueryFilters({
      price: normalizeProductPriceRange(price, bounds) ?? null,
      page: null,
    })
  }

  const setPage = (page?: number) =>
    void setQueryFilters({ page: normalizeProductsPage(page) ?? null })

  const resetFilters = () => {
    void setQueryFilters(null)
  }

  const selectedLimit = filters.limit ?? DEFAULT_PRODUCTS_LIMIT
  const selectedSort = filters.sort ?? PRODUCT_DEFAULT_SORT
  const hasActiveFilters = hasActiveProductFilters(filters)

  return {
    filters,
    selectedLimit,
    selectedSort,
    isPending,
    hasActiveFilters,
    setSize,
    setColorName,
    setMaterial,
    setSort,
    setLimit,
    setPrice,
    setPage,
    resetFilters,
  }
}
