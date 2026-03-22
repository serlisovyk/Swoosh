import { useFavoritesStore } from '../favorites.store'
import {
  selectFavoriteProductIds,
  selectFavoritesCount,
  selectHasHydrated,
  selectIsFavoriteProduct,
  selectSetFavoriteProductIds,
  selectAddFavoriteProductId,
  selectRemoveFavoriteProductId,
} from '../selectors'

export function useFavoriteProductIds() {
  return useFavoritesStore(selectFavoriteProductIds)
}

export function useFavoritesCount() {
  return useFavoritesStore(selectFavoritesCount)
}

export function useFavoritesHydrated() {
  return useFavoritesStore(selectHasHydrated)
}

export function useIsFavoriteProduct(productId: string) {
  return useFavoritesStore(selectIsFavoriteProduct(productId))
}

export function useSetFavoriteProductIds() {
  return useFavoritesStore(selectSetFavoriteProductIds)
}

export function useAddFavoriteProductId() {
  return useFavoritesStore(selectAddFavoriteProductId)
}

export function useRemoveFavoriteProductId() {
  return useFavoritesStore(selectRemoveFavoriteProductId)
}
