'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { isAxiosError } from 'axios'
import { ArrowRight } from 'lucide-react'
import { getErrorMessage } from '@shared/api'
import { ROUTES } from '@shared/config'
import { Button, Heading } from '@shared/ui'
import { useVerifyEmailMutation } from '../../queries'
import { useParseEmailVerificationToken } from '../../hooks'
import { getVerifyEmailViewState } from '../../utils'
import { VERIFY_EMAIL_INVALID_TOKEN_MESSAGE } from '../../constants'
import {
  VERIFY_EMAIL_LOADING_MESSAGES,
  VERIFY_EMAIL_VIEW_STATUSES,
} from '../../types'
import styles from './verify-email.module.css'

export function VerifyEmail() {
  const router = useRouter()

  const hasRequestedRef = useRef(false)

  const { token, tokenSuccess, tokenError } = useParseEmailVerificationToken()

  const { verifyEmail, isLoading, isSuccess, error } = useVerifyEmailMutation()

  useEffect(() => {
    if (!tokenSuccess || !token || hasRequestedRef.current) return

    hasRequestedRef.current = true

    void verifyEmail({ token })
  }, [token, tokenSuccess, verifyEmail])

  useEffect(() => {
    if (!isSuccess) return

    const timeoutId = window.setTimeout(() => {
      router.replace(ROUTES.PROFILE)
    }, 1500)

    return () => window.clearTimeout(timeoutId)
  }, [isSuccess, router])

  const invalidTokenMessage =
    tokenError?.issues[0]?.message || VERIFY_EMAIL_INVALID_TOKEN_MESSAGE

  const errorMessage = isAxiosError(error)
    ? getErrorMessage(error)
    : 'Не удалось подтвердить почту.'

  const isErrorState = !tokenSuccess || Boolean(error)

  const viewStatus = isSuccess
    ? VERIFY_EMAIL_VIEW_STATUSES.SUCCESS
    : isErrorState
      ? VERIFY_EMAIL_VIEW_STATUSES.ERROR
      : VERIFY_EMAIL_VIEW_STATUSES.PENDING

  const viewState = getVerifyEmailViewState({
    status: viewStatus,
    errorDescription: tokenSuccess ? errorMessage : invalidTokenMessage,
    isLoading,
  })

  const Icon = viewState.icon

  return (
    <div className="container">
      <Heading as="h1" className={styles.title}>
        Подтверждение почты
      </Heading>

      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <Icon size={32} />
          </div>

          <div className={styles.content}>
            <h2 className={styles.subtitle}>{viewState.title}</h2>
            <p className={styles.description}>{viewState.description}</p>

            {viewState.actionHref && viewState.actionLabel ? (
              <Button
                href={viewState.actionHref}
                variant="dark"
                icon={ArrowRight}
              >
                {viewState.actionLabel}
              </Button>
            ) : (
              <div className={styles.loading}>
                {viewState.isLoading
                  ? VERIFY_EMAIL_LOADING_MESSAGES.PENDING
                  : VERIFY_EMAIL_LOADING_MESSAGES.IDLE}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
