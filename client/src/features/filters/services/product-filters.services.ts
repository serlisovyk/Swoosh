import { API, API_ROUTES } from '@shared/api'
import type { ProductFiltersMetadataResponse } from '../types'

export async function getProductFiltersMetadata() {
  const { data } = await API.get<ProductFiltersMetadataResponse>(
    API_ROUTES.PRODUCT_FILTERS,
  )

  return data
}
