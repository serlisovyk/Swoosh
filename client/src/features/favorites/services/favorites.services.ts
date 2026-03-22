import { API, API_ROUTES } from '@shared/api'
import { serializeFavoriteProductIds } from '../utils'
import { FavoriteProductsResponse, FavoritesStateResponse } from '../types'

export async function getFavoriteProducts(ids: string[]) {
  const { data } = await API.get<FavoriteProductsResponse>(API_ROUTES.PRODUCTS, {
    params: { ids },
    paramsSerializer: () => serializeFavoriteProductIds(ids),
  })

  return data
}

export async function addFavoriteProduct(
  productId: string,
): Promise<FavoritesStateResponse> {
  const { data } = await API.put<FavoritesStateResponse>(
    API_ROUTES.FAVORITE(productId),
  )

  return data
}

export async function removeFavoriteProduct(
  productId: string,
): Promise<FavoritesStateResponse> {
  const { data } = await API.delete<FavoritesStateResponse>(
    API_ROUTES.FAVORITE(productId),
  )

  return data
}
