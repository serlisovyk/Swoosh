import { API_ROUTES, BaseService } from '@shared/api'
import type { ProductFiltersMetadataResponse } from '../types'

class ProductFiltersService extends BaseService {
  async getProductFiltersMetadata(): Promise<ProductFiltersMetadataResponse> {
    return this.get(API_ROUTES.PRODUCT_FILTERS)
  }
}

export const productFiltersService = new ProductFiltersService()
