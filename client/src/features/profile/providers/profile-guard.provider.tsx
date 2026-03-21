'use client'

import { type PropsWithChildren, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useGetMeQuery } from '@features/auth'
import { ROUTES } from '@shared/config'
import { Skeleton } from '@shared/ui'

// Check how to create many proxies in different files
// TODO: Maybe move this into server Next.js proxy
export function ProfileGuardProvider({ children }: PropsWithChildren) {
  const router = useRouter()

  const hasHandledUnAuthRef = useRef(false)

  const { user, isLoading, error } = useGetMeQuery()

  useEffect(() => {
    if (isLoading || hasHandledUnAuthRef.current) return

    if (error || !user) {
      hasHandledUnAuthRef.current = true

      toast.error('Для доступа к профилю нужно авторизоваться')

      router.replace(ROUTES.HOME)
    }
  }, [error, isLoading, router, user])

  if (isLoading) return <Skeleton count={4} />

  if (error || !user) return null

  return children
}
