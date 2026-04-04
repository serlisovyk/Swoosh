import { API_ROUTES, BaseService } from '@shared/api'
import { serializeProductsParams } from '../utils'
import type { GetProductsParams, Product, ProductsListResponse } from '../types'

class ProductService extends BaseService {
  async getProducts(params?: GetProductsParams): Promise<ProductsListResponse> {
    return this.get(API_ROUTES.PRODUCTS, {
      params,
      paramsSerializer: () => serializeProductsParams(params),
    })
  }

  async getProductById(id: string): Promise<Product> {
    return this.get(API_ROUTES.PRODUCT(id))
  }
}

export const productService = new ProductService()
