'use client'

import cn from 'clsx'
import { ArrowRight, LoaderCircle, TriangleAlert } from 'lucide-react'
import { Button, Heading } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { useSocialAuth } from '../../hooks'
import { SOCIAL_AUTH_ERROR_MESSAGE } from '../../constants'
import styles from './social-auth.module.css'

export function SocialAuth() {
  const { isSuccessState, isLoading } = useSocialAuth()

  const Icon = isSuccessState ? LoaderCircle : TriangleAlert

  return (
    <div className="container">
      <Heading as="h1" className={styles.title}>
        Вход через соцсеть
      </Heading>

      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div
            className={cn(styles.icon, {
              [styles.loadingIcon]: isSuccessState,
            })}
          >
            <Icon size={32} />
          </div>

          <div className={styles.content}>
            {isSuccessState ? (
              <>
                <h2 className={styles.subtitle}>Вход почти завершён</h2>
                <p className={styles.description}>
                  Мы обновляем ваш аккаунт и перенаправляем вас в личный
                  кабинет.
                </p>
                <div className={styles.loading}>
                  {isLoading ? 'Переходим в профиль...' : 'Подождите немного...'}
                </div>
              </>
            ) : (
              <>
                <h2 className={styles.subtitle}>Не удалось войти</h2>
                <p className={styles.description}>
                  {SOCIAL_AUTH_ERROR_MESSAGE}
                </p>
                <Button href={ROUTES.LOGIN} variant="dark" icon={ArrowRight}>
                  Вернуться ко входу
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
