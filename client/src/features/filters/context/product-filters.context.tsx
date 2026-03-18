'use client'

import { createContext, useContext, type PropsWithChildren } from 'react'
import { useProductFilters } from '../hooks'
import { ProductFiltersContextValue } from '../types'

const ProductFiltersContext = createContext<ProductFiltersContextValue>(null)

export function ProductFiltersProvider({ children }: PropsWithChildren) {
  const value = useProductFilters()

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
