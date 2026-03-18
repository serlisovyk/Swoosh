'use client'

import { useQuery } from '@tanstack/react-query'
import { API_QUERY_KEYS } from '@shared/api'
import { EMPTY_PRODUCT_FILTERS_METADATA } from '../constants'
import { getProductFiltersMetadata } from '../services'
import { mapProductFiltersMetadata } from '../utils'

export function useGetProductFiltersQuery() {
  const { data, error, isLoading } = useQuery({
    queryKey: [API_QUERY_KEYS.PRODUCT_FILTERS],
    queryFn: getProductFiltersMetadata,
    select: mapProductFiltersMetadata,
  })

  const filterMetadata = data ?? EMPTY_PRODUCT_FILTERS_METADATA

  return {
    filterMetadata,
    isLoading,
    error,
  }
}
