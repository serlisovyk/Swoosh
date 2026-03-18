'use client'

import { useCallback, useEffect, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ProductPriceRange, ProductSortOption } from '@features/product'
import { PRODUCT_DEFAULT_LIMIT, PRODUCT_DEFAULT_SORT } from '../constants'
import { parseProductFiltersSearchParams } from '../schemas'
import { createProductFiltersUrl, normalizeProductPriceRange } from '../utils'
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

  const setSize = (size?: number) => updateUrl({ ...filters, size })

  const setMaterial = (material?: string) => updateUrl({ ...filters, material })

  const setSort = (sort?: ProductSortOption) => updateUrl({ ...filters, sort })

  const setLimit = (limit?: number) => updateUrl({ ...filters, limit })

  const setColorName = (colorName?: string) => {
    updateUrl({ ...filters, colorName })
  }

  const setPrice = (price: ProductPriceRange, bounds: ProductPriceRange) => {
    updateUrl({
      ...filters,
      price: normalizeProductPriceRange(price, bounds),
    })
  }

  const resetFilters = () => {
    updateUrl({})
  }

  const selectedLimit = filters.limit ?? PRODUCT_DEFAULT_LIMIT
  const selectedSort = filters.sort ?? PRODUCT_DEFAULT_SORT

  return {
    filters,
    selectedLimit,
    selectedSort,
    isPending,
    setSize,
    setColorName,
    setMaterial,
    setSort,
    setLimit,
    setPrice,
    resetFilters,
  }
}
