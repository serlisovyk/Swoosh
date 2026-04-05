'use client'

import { ArrowLeft, Mail, RefreshCcw } from 'lucide-react'
import { useRequestEmailVerificationMutation } from '@features/auth'
import { ROUTES } from '@shared/config'
import { Button, Heading } from '@shared/ui'
import styles from './profile-email-verification-notice.module.css'
import { verificationNoticeContent } from '../../../config'
import { ProfileEmailVerificationNoticeProps } from '../../../types'

export function ProfileEmailVerificationNotice({
  variant,
}: ProfileEmailVerificationNoticeProps) {
  const { requestEmailVerification, isLoading } =
    useRequestEmailVerificationMutation()

  const content = verificationNoticeContent[variant]

  const isBanner = variant === 'banner'

  const handleResend = async () => await requestEmailVerification()

  return (
    <div className={`${styles.notice} ${styles[variant]}`}>
      {isBanner ? (
        <>
          <div className={styles.content}>
            <div className={styles.icon}>
              <Mail size={20} />
            </div>

            <div className={styles.text}>
              <Heading as="h2" className={styles.title}>
                {content.title}
              </Heading>
              <p className={styles.description}>{content.description}</p>
            </div>
          </div>

          <Button
            type="button"
            variant="darkReverse"
            icon={RefreshCcw}
            className={styles.button}
            onClick={handleResend}
            disabled={isLoading}
          >
            {isLoading ? 'Отправляем...' : 'Отправить письмо еще раз'}
          </Button>
        </>
      ) : (
        <>
          <Heading as="h2" className={`${styles.title} ${styles.titleBlocked}`}>
            {content.title}
          </Heading>

          <p className={`${styles.description} ${styles.descriptionBlocked}`}>
            {content.description}
          </p>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="darkReverse"
              icon={RefreshCcw}
              onClick={handleResend}
              disabled={isLoading}
            >
              {isLoading ? 'Отправляем...' : 'Отправить письмо еще раз'}
            </Button>

            <Button href={ROUTES.PROFILE} variant="dark" icon={ArrowLeft}>
              Вернуться в профиль
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
