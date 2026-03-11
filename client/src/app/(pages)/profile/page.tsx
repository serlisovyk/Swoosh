'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useGetMeQuery } from '@features/auth'
import { ProfileMain } from '@features/profile'
import { ROUTES } from '@shared/config'

export default function ProfilePage() {
  const router = useRouter()

  const { user, isLoading, error } = useGetMeQuery()

  // TODO: Create skeleton ui component
  if (isLoading) return <p>Loading...</p>

  // TODO: create some guard on layout level to prevent this case,
  // because if user is not authenticated he should not be able to see this page at all
  if (error) {
    toast.error('Не удалось загрузить данные пользователя')
    router.replace(ROUTES.HOME)
    return
  }

  if (!user) {
    toast.error('Пользователь не найден')
    router.replace(ROUTES.HOME)
    return
  }

  return <ProfileMain />
}
