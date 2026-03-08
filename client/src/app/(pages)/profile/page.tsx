'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useGetMeQuery } from '@features/auth'
import { ProfileMenu } from '@features/profile'
import { ROUTES } from '@shared/config'
import styles from './profile.module.css'

export default function ProfilePage() {
  const router = useRouter()

  const { user, isLoading, error } = useGetMeQuery()

  // TODO: Create skeleton ui component
  if (isLoading) return <p>Loading...</p>

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

  return (
    <div>
      <div className={styles.welcome}>
        Добро Пожаловать, {user.name || 'Гость'}!
      </div>
      <ProfileMenu isCompact={true} />
      {/* TODO: add orders list */}
    </div>
  )
}
