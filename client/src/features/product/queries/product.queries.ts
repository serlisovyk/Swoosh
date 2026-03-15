'use client'

import { useQuery } from '@tanstack/react-query'
import { API_QUERY_KEYS } from '@shared/api'
import { getProducts } from '../services'

export function useGetProductsQuery() {
  const { data, error, isLoading } = useQuery({
    queryKey: [API_QUERY_KEYS.PRODUCTS],
    queryFn: () => getProducts(),
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0

  return {
    products,
    total,
    isLoading,
    error,
  }
}
