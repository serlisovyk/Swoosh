'use client'

import Link from 'next/link'
import { User } from 'lucide-react'
import { useProfile } from '@features/auth'
import { Skeleton } from '@shared/ui'
import { ROUTES } from '@shared/config'
import styles from './header-auth.module.css'

export function HeaderAuth() {
  const { isLoggedIn, isLoading } = useProfile()

  if (isLoading) return <Skeleton count={1} />

  return (
    <div className={styles.headerAuth}>
      <User size={20} />
      <div>
        {isLoggedIn ? (
          <Link href={ROUTES.PROFILE} className={styles.link}>
            Мой профиль
          </Link>
        ) : (
          <Link href={ROUTES.LOGIN} className={styles.link}>
            Вход \ Регистрация
          </Link>
        )}
      </div>
    </div>
  )
}
