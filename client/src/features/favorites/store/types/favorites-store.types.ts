export interface FavoritesStoreState {
  favoriteProductIds: string[]
  hasHydrated: boolean
  setFavoriteProductIds: (productIds: string[]) => void
  addFavoriteProductId: (productId: string) => void
  removeFavoriteProductId: (productId: string) => void
  setHasHydrated: (hasHydrated: boolean) => void
}
