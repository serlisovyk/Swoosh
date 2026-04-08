import { useQueryStates } from 'nuqs'
import {
  buildProductQueryParams,
  normalizeProductFiltersSearchState,
  productFiltersSearchParams,
} from '../utils'

export function useProductFilterParams() {
  const [queryFilters] = useQueryStates(productFiltersSearchParams)
  const filters = normalizeProductFiltersSearchState(queryFilters)

  return buildProductQueryParams(filters)
}
