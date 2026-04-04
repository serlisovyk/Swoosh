import { API_ROUTES, BaseService } from '@shared/api'
import { serializeFavoriteProductIds } from '../utils'
import type {
  FavoriteProductsResponse,
  FavoritesStateResponse,
} from '../types'

class FavoritesService extends BaseService {
  async getFavoriteProducts(ids: string[]): Promise<FavoriteProductsResponse> {
    return this.get(API_ROUTES.PRODUCTS, {
      params: { ids },
      paramsSerializer: () => serializeFavoriteProductIds(ids),
    })
  }

  async addFavoriteProduct(
    productId: string,
  ): Promise<FavoritesStateResponse> {
    return this.put(API_ROUTES.FAVORITE(productId))
  }

  async removeFavoriteProduct(
    productId: string,
  ): Promise<FavoritesStateResponse> {
    return this.delete(API_ROUTES.FAVORITE(productId))
  }
}

export const favoritesService = new FavoritesService()
