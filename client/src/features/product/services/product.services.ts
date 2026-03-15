import { API, API_ROUTES } from '@shared/api'
import { GetProductsParams, ProductsListResponse } from '../types'

export async function getProducts(
  params?: GetProductsParams,
): Promise<ProductsListResponse> {
  const { data } = await API.get<ProductsListResponse>(API_ROUTES.PRODUCTS, {
    params,
  })

  return data
}
