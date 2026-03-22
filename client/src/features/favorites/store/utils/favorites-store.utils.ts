import { useFavoritesStore } from '../favorites.store'

export async function rehydrateFavoritesStore() {
  await useFavoritesStore.persist.rehydrate()
}
