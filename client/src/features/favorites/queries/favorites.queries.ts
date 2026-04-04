'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useGetMeQuery } from '@features/auth'
import { API_QUERY_KEYS, getErrorMessage } from '@shared/api'
import {
  useAddFavoriteProductId,
  useFavoriteProductIds,
  useFavoritesHydrated,
  useIsFavoriteProduct,
  useRemoveFavoriteProductId,
  useSetFavoriteProductIds,
} from '../store'
import {
  addFavoriteProduct,
  getFavoriteProducts,
  removeFavoriteProduct,
} from '../services'
import { syncFavoriteIdsInMeCache } from '../utils'

export function useFavoriteProductsQuery() {
  const favoriteProductIds = useFavoriteProductIds()
  const hasHydrated = useFavoritesHydrated()

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: [API_QUERY_KEYS.PRODUCTS, { ids: favoriteProductIds }],
    queryFn: () => getFavoriteProducts(favoriteProductIds),
    enabled: hasHydrated && favoriteProductIds.length > 0,
  })

  const products = data?.products ?? []
  const total = data?.total ?? 0

  return {
    products,
    total,
    error,
    isLoading,
    isFetching,
  }
}

export function useFavoriteToggle(productId: string) {
  const { user, isLoading: isAuthLoading } = useGetMeQuery()

  const isFavorite = useIsFavoriteProduct(productId)
  const hasHydrated = useFavoritesHydrated()

  const addFavoriteProductId = useAddFavoriteProductId()
  const removeFavoriteProductId = useRemoveFavoriteProductId()

  const { addProductToFavorites, isLoading: isAdding } =
    useAddFavoriteProductMutation()

  const { removeProductFromFavorites, isLoading: isRemoving } =
    useRemoveFavoriteProductMutation()

  const toggleFavorite = async () => {
    if (!hasHydrated) return

    if (!user) {
      if (isFavorite) {
        removeFavoriteProductId(productId)
        return
      }

      addFavoriteProductId(productId)
      return
    }

    if (isFavorite) {
      await removeProductFromFavorites(productId)
      return
    }

    await addProductToFavorites(productId)
  }

  return {
    isFavorite,
    isLoading: !hasHydrated || isAuthLoading || isAdding || isRemoving,
    toggleFavorite,
  }
}

function useAddFavoriteProductMutation() {
  const queryClient = useQueryClient()
  const setFavoriteProductIds = useSetFavoriteProductIds()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (productId: string) => addFavoriteProduct(productId),
    onSuccess: ({ favoriteProductIds }) => {
      setFavoriteProductIds(favoriteProductIds)
      syncFavoriteIdsInMeCache(queryClient, favoriteProductIds)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return {
    addProductToFavorites: mutateAsync,
    isLoading: isPending,
  }
}

function useRemoveFavoriteProductMutation() {
  const queryClient = useQueryClient()
  const setFavoriteProductIds = useSetFavoriteProductIds()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (productId: string) => removeFavoriteProduct(productId),
    onSuccess: ({ favoriteProductIds }) => {
      setFavoriteProductIds(favoriteProductIds)
      syncFavoriteIdsInMeCache(queryClient, favoriteProductIds)
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) toast.error(getErrorMessage(error))
    },
  })

  return {
    removeProductFromFavorites: mutateAsync,
    isLoading: isPending,
  }
}
