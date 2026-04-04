'use client'

import { useProfile } from '@features/auth'
import { ProfileMenu } from '../profile-menu'
import styles from './profile-main.module.css'

export function ProfileMain() {
  const { user } = useProfile()

  return (
    <div>
      <div className={styles.welcome}>
        Добро Пожаловать, {user?.name || 'Гость'}!
      </div>
      <ProfileMenu isCompact={true} />
      {/* TODO: add orders list */}
      Orders
    </div>
  )
}
