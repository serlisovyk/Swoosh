'use client'

import { useQuery } from '@tanstack/react-query'
import { API_QUERY_KEYS } from '@shared/api'
import { productFiltersService } from '../services'
import { mapProductFiltersMetadata } from '../utils'
import { EMPTY_PRODUCT_FILTERS_METADATA } from '../constants'

export function useGetProductFiltersQuery() {
  const { data, error, isLoading } = useQuery({
    queryKey: [API_QUERY_KEYS.PRODUCT_FILTERS],
    queryFn: () => productFiltersService.getProductFiltersMetadata(),
    select: mapProductFiltersMetadata,
  })

  const filterMetadata = data ?? EMPTY_PRODUCT_FILTERS_METADATA

  return { filterMetadata, isLoading, error }
}
