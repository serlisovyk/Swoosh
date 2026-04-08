'use client'

import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { API_QUERY_KEYS } from '@shared/api'
import { productService } from '../services'
import { DEFAULT_PRODUCTS_LIMIT, PRICE_QUERY_DEBOUNCE_MS } from '../constants'
import { normalizeProductsPage } from '../utils'
import type {
  GetProductsParams,
  GetProductsQueryOptions,
  ProductPriceRange,
} from '../types'

export function useGetProductsQuery(
  params?: GetProductsParams,
  options?: GetProductsQueryOptions,
) {
  const debouncedPriceValue = useDebouncedValue(
    stringifyPriceRange(params?.price),
    PRICE_QUERY_DEBOUNCE_MS,
  )

  const queryParams = {
    ...params,
    price: parsePriceRange(debouncedPriceValue),
    page: normalizeProductsPage(params?.page),
  }

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: [API_QUERY_KEYS.PRODUCTS, queryParams],
    queryFn: () => productService.getProducts(queryParams),
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0
  const currentPage = queryParams.page ?? 1
  const limit = queryParams.limit ?? DEFAULT_PRODUCTS_LIMIT
  const totalPages = total ? Math.ceil(total / limit) : 0

  return {
    products,
    total,
    currentPage,
    totalPages,
    isLoading,
    isFetching,
    error,
  }
}

export function useGetProductByIdQuery(productId: string) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: [API_QUERY_KEYS.PRODUCT, productId],
    queryFn: () => productService.getProductById(productId),
    enabled: Boolean(productId),
    retry: false,
  })

  return {
    product,
    isLoading,
    error,
  }
}

function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [delay, value])

  return debouncedValue
}

function stringifyPriceRange(price?: ProductPriceRange) {
  return price ? price.join(',') : null
}

function parsePriceRange(value: string | null): ProductPriceRange | undefined {
  if (!value) return undefined

  const numbers = value
    .split(',')
    .map((priceValue) => Number(priceValue))
    .filter((priceValue) => Number.isFinite(priceValue))

  if (!numbers.length) return undefined

  const [minPrice, maxPrice = numbers[0]] = numbers

  return [minPrice, maxPrice]
}
