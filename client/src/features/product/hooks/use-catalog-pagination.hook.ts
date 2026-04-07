'use client'

import { useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  createProductsPaginationHref,
  getProductsPaginationCorrectionHref,
} from '../utils'

interface UseCatalogPaginationParams {
  currentPage: number
  totalPages: number
  isLoading: boolean
  isFetching: boolean
  hasError: boolean
}

export function useCatalogPagination({
  currentPage,
  totalPages,
  isLoading,
  isFetching,
  hasError,
}: UseCatalogPaginationParams) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const rawSearchParams = searchParams.toString()

  useEffect(() => {
    if (isLoading || isFetching || hasError) {
      return
    }

    const correctionHref = getProductsPaginationCorrectionHref(
      pathname,
      rawSearchParams,
      currentPage,
      totalPages,
    )

    if (!correctionHref) {
      return
    }

    router.replace(correctionHref, {
      scroll: false,
    })
  }, [
    currentPage,
    hasError,
    isFetching,
    isLoading,
    pathname,
    rawSearchParams,
    router,
    totalPages,
  ])

  const getPageHref = useCallback(
    (page: number) =>
      createProductsPaginationHref(pathname, rawSearchParams, page),
    [pathname, rawSearchParams],
  )

  return {
    getPageHref,
  }
}
