'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { normalizeFavoriteProductIds } from '../utils'
import { FAVORITES_STORAGE_KEY } from './constants'
import { FavoritesStoreState } from './types'

export const useFavoritesStore = create<FavoritesStoreState>()(
  persist(
    (set) => ({
      favoriteProductIds: [],
      hasHydrated: false,

      setFavoriteProductIds: (productIds) => {
        set({
          favoriteProductIds: normalizeFavoriteProductIds(productIds),
        })
      },

      addFavoriteProductId: (productId) => {
        set((state) => ({
          favoriteProductIds: normalizeFavoriteProductIds([
            ...state.favoriteProductIds,
            productId,
          ]),
        }))
      },

      removeFavoriteProductId: (productId) => {
        set((state) => ({
          favoriteProductIds: state.favoriteProductIds.filter(
            (currentProductId) => currentProductId !== productId,
          ),
        }))
      },

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({ favoriteProductIds: state.favoriteProductIds }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
)
