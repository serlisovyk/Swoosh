import { API, API_ROUTES } from '@shared/api'
import { serializeProductsParams } from '../utils'
import type { GetProductsParams, Product, ProductsListResponse } from '../types'

export async function getProducts(
  params?: GetProductsParams,
): Promise<ProductsListResponse> {
  const { data } = await API.get<ProductsListResponse>(API_ROUTES.PRODUCTS, {
    params,
    paramsSerializer: () => serializeProductsParams(params),
  })

  return data
}

export async function getProductById(id: string): Promise<Product> {
  const { data } = await API.get<Product>(API_ROUTES.PRODUCT(id))

  return data
}
