'use client'

import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useProductFilterParams } from '@features/filters'
import { API_QUERY_KEYS } from '@shared/api'
import type { ProductPriceRange } from '../types'
import { getProductById, getProducts } from '../services'

const PRICE_QUERY_DEBOUNCE_MS = 250

export function useGetProductsQuery() {
  const productParams = useProductFilterParams()
  const debouncedPriceValue = useDebouncedValue(
    stringifyPriceRange(productParams.price),
    PRICE_QUERY_DEBOUNCE_MS,
  )

  const queryParams = {
    ...productParams,
    price: parsePriceRange(debouncedPriceValue),
  }

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: [API_QUERY_KEYS.PRODUCTS, queryParams],
    queryFn: () => getProducts(queryParams),
    placeholderData: keepPreviousData,
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0

  return {
    products,
    total,
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
    queryFn: () => getProductById(productId),
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
