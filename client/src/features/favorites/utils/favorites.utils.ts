import { useQueryClient } from '@tanstack/react-query'
import { User } from '@features/auth'
import { API_QUERY_KEYS } from '@shared/api'
import { appendQueryArrayParam } from '@shared/utils'

export function serializeFavoriteProductIds(ids: string[]) {
  const searchParams = new URLSearchParams()

  appendQueryArrayParam(searchParams, 'ids', ids)

  return searchParams.toString()
}

export function normalizeFavoriteProductIds(productIds: unknown) {
  if (!Array.isArray(productIds)) return []

  return [...new Set(productIds.map(String).filter(Boolean))]
}

export function syncFavoriteIdsInMeCache(
  queryClient: ReturnType<typeof useQueryClient>,
  favoriteProductIds: string[],
) {
  queryClient.setQueryData<User | undefined>([API_QUERY_KEYS.ME], (user) => {
    if (!user) return user

    return {
      ...user,
      favoriteProductIds,
    }
  })
}
