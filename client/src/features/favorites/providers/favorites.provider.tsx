'use client'

import { useEffect } from 'react'
import { useGetMeQuery } from '@features/auth'
import { FavoritesProviderProps } from '../types'
import {
  rehydrateFavoritesStore,
  useFavoritesHydrated,
  useSetFavoriteProductIds,
} from '../store'

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { user } = useGetMeQuery()
  const hasHydrated = useFavoritesHydrated()
  const setFavoriteProductIds = useSetFavoriteProductIds()

  useEffect(() => {
    void rehydrateFavoritesStore()
  }, [])

  useEffect(() => {
    if (!hasHydrated || !user) return

    setFavoriteProductIds(user.favoriteProductIds)
  }, [hasHydrated, setFavoriteProductIds, user])

  return children
}
