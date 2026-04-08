'use client'

import { createContext, useContext, type PropsWithChildren } from 'react'
import { useProductFilters } from '../hooks'
import { useGetProductFiltersQuery } from '../queries'
import type { ProductFiltersContextValue } from '../types'

const ProductFiltersContext = createContext<ProductFiltersContextValue | null>(
  null,
)

export function ProductFiltersProvider({ children }: PropsWithChildren) {
  const filtersState = useProductFilters()
  const { filterMetadata, isLoading, error } = useGetProductFiltersQuery()

  const value: ProductFiltersContextValue = {
    ...filtersState,
    filterMetadata,
    hasMetadataError: Boolean(error),
    areMetadataFiltersDisabled: isLoading || Boolean(error),
  }

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  )
}

export function useProductFiltersContext() {
  const context = useContext(ProductFiltersContext)

  if (!context) {
    throw new Error(
      'useProductFiltersContext must be used within ProductFiltersProvider',
    )
  }

  return context
}
