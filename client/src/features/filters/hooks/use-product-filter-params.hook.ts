import { useSearchParams } from 'next/navigation'
import { parseProductFiltersSearchParams } from '../schemas'
import { buildProductQueryParams } from '../utils'

export function useProductFilterParams() {
  const searchParams = useSearchParams()
  const filters = parseProductFiltersSearchParams(searchParams)

  return buildProductQueryParams(filters)
}
