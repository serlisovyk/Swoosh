import { FavoritesStoreState } from '../types'

export const selectFavoriteProductIds = (state: FavoritesStoreState) =>
  state.favoriteProductIds

export const selectFavoritesCount = (state: FavoritesStoreState) =>
  state.favoriteProductIds.length

export const selectHasHydrated = (state: FavoritesStoreState) =>
  state.hasHydrated

export const selectIsFavoriteProduct =
  (productId: string) => (state: FavoritesStoreState) =>
    state.favoriteProductIds.includes(productId)

export const selectSetFavoriteProductIds = (state: FavoritesStoreState) =>
  state.setFavoriteProductIds

export const selectAddFavoriteProductId = (state: FavoritesStoreState) =>
  state.addFavoriteProductId

export const selectRemoveFavoriteProductId = (state: FavoritesStoreState) =>
  state.removeFavoriteProductId
