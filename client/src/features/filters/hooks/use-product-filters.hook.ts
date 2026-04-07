'use client'

import { useCallback, useEffect, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DEFAULT_PRODUCTS_LIMIT } from '@features/product/constants'
import { normalizeProductsPage } from '@features/product/utils'
import type { ProductPriceRange, ProductSortOption } from '@features/product/types'
import { PRODUCT_DEFAULT_SORT } from '../constants'
import { parseProductFiltersSearchParams } from '../schemas'
import {
  createProductFiltersUrl,
  normalizeProductPriceRange,
  resetProductFiltersPage,
} from '../utils'
import type { ProductFiltersState } from '../types'

export function useProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()

  const rawSearchParams = searchParams.toString()

  const currentUrl = rawSearchParams
    ? `${pathname}?${rawSearchParams}`
    : pathname

  const filters = parseProductFiltersSearchParams(searchParams)

  const replaceUrl = useCallback(
    (nextUrl: string) => {
      if (nextUrl === currentUrl) return
      startTransition(() => router.replace(nextUrl, { scroll: false }))
    },
    [currentUrl, router, startTransition],
  )

  const updateUrl = (nextFilters: ProductFiltersState) => {
    replaceUrl(createProductFiltersUrl(pathname, rawSearchParams, nextFilters))
  }

  useEffect(() => {
    replaceUrl(createProductFiltersUrl(pathname, rawSearchParams, filters))
  }, [filters, pathname, rawSearchParams, replaceUrl])

  const setSize = (size?: number) =>
    updateUrl(resetProductFiltersPage({ ...filters, size }))

  const setMaterial = (material?: string) =>
    updateUrl(resetProductFiltersPage({ ...filters, material }))

  const setSort = (sort?: ProductSortOption) =>
    updateUrl(resetProductFiltersPage({ ...filters, sort }))

  const setLimit = (limit?: number) =>
    updateUrl(resetProductFiltersPage({ ...filters, limit }))

  const setColorName = (colorName?: string) => {
    updateUrl(resetProductFiltersPage({ ...filters, colorName }))
  }

  const setPrice = (price: ProductPriceRange, bounds: ProductPriceRange) => {
    updateUrl(
      resetProductFiltersPage({
        ...filters,
        price: normalizeProductPriceRange(price, bounds),
      }),
    )
  }

  const setPage = (page?: number) =>
    updateUrl({ ...filters, page: normalizeProductsPage(page) })

  const resetFilters = () => {
    updateUrl({})
  }

  const selectedLimit = filters.limit ?? DEFAULT_PRODUCTS_LIMIT
  const selectedPage = filters.page ?? 1
  const selectedSort = filters.sort ?? PRODUCT_DEFAULT_SORT

  return {
    filters,
    selectedLimit,
    selectedPage,
    selectedSort,
    isPending,
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
