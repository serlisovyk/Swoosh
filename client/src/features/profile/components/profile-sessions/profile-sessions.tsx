'use client'

import { useState } from 'react'
import {
  useLogoutAllMutation,
  useLogoutMutation,
  useRevokeSessionMutation,
  useSessionsQuery,
} from '@features/auth/queries'
import type { AuthSessionItem } from '@features/auth/types'
import { Button, Heading, Modal, Skeleton } from '@shared/ui'
import styles from './profile-sessions.module.css'

type SessionActionState =
  | { type: 'logout-all' }
  | { type: 'revoke'; session: AuthSessionItem }
  | null

const EMPTY_IP_VALUE = '-'

export function ProfileSessions() {
  const [actionState, setActionState] = useState<SessionActionState>(null)

  const { sessions, isLoading, error } = useSessionsQuery()
  const { logout, isLoading: isLogoutLoading } = useLogoutMutation()
  const { logoutAll, isLoading: isLogoutAllLoading } = useLogoutAllMutation()
  const { revokeSession, isLoading: isRevokeLoading } =
    useRevokeSessionMutation()

  const currentSession = sessions.find((session) => session.isCurrent) ?? null
  const otherSessions = sessions.filter((session) => !session.isCurrent)

  const isConfirmOpen = Boolean(actionState)
  const isConfirmLoading =
    isLogoutAllLoading ||
    (actionState?.type === 'revoke' ? isRevokeLoading : false)

  const closeConfirmModal = () => {
    if (isConfirmLoading) return

    setActionState(null)
  }

  const handleConfirmAction = async () => {
    if (!actionState) return

    if (actionState.type === 'logout-all') {
      await logoutAll()
      return
    }

    await revokeSession(actionState.session.sessionId)
    setActionState(null)
  }

  if (isLoading) return <Skeleton count={6} />

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <Heading as="h2">Активные сессии</Heading>

          <p className={styles.description}>
            Здесь можно посмотреть активные сессии аккаунта и завершить лишние.
            Дата последней активности приблизительная и обновляется при входе и
            обновлении сессии.
          </p>
        </div>

        <Button
          type="button"
          variant="darkReverse"
          onClick={() => setActionState({ type: 'logout-all' })}
          disabled={!sessions.length || isLogoutLoading || isConfirmLoading}
        >
          Выйти со всех устройств
        </Button>
      </div>

      {error ? (
        <div className={styles.errorState}>
          Не удалось загрузить список активных сессий.
        </div>
      ) : (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Heading as="h3">Текущая сессия</Heading>
            </div>

            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                  {currentSession?.deviceLabel ??
                    'Текущая сессия не определена'}
                </div>

                <div className={styles.metaList}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>IP</span>
                    <span>{currentSession?.ip ?? EMPTY_IP_VALUE}</span>
                  </div>

                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>
                      Последняя активность
                    </span>
                    <span>
                      {formatSessionDate(
                        currentSession?.lastUsedAt ?? new Date().toISOString(),
                      )}
                    </span>
                  </div>

                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Создана</span>
                    <span>
                      {formatSessionDate(
                        currentSession?.createdAt ?? new Date().toISOString(),
                      )}
                    </span>
                  </div>
                </div>

                {!currentSession && (
                  <p className={styles.note}>
                    Текущая сессия не определена, но вы всё равно можете выйти
                    из аккаунта на этом устройстве.
                  </p>
                )}
              </div>

              <div className={styles.cardActions}>
                <Button
                  type="button"
                  variant="dark"
                  onClick={() => {
                    void logout()
                  }}
                  disabled={isLogoutLoading || isConfirmLoading}
                >
                  Выйти на этом устройстве
                </Button>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Heading as="h3">Другие активные сессии</Heading>
            </div>

            {otherSessions.length ? (
              <div className={styles.list}>
                {otherSessions.map((session) => (
                  <div key={session.sessionId} className={styles.card}>
                    <div className={styles.cardContent}>
                      <div className={styles.cardTitle}>
                        {session.deviceLabel}
                      </div>

                      <div className={styles.metaList}>
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>IP</span>
                          <span>{session.ip ?? EMPTY_IP_VALUE}</span>
                        </div>

                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>
                            Последняя активность
                          </span>
                          <span>{formatSessionDate(session.lastUsedAt)}</span>
                        </div>

                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>Создана</span>
                          <span>{formatSessionDate(session.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      <Button
                        type="button"
                        variant="darkReverse"
                        onClick={() =>
                          setActionState({ type: 'revoke', session })
                        }
                        disabled={isLogoutLoading || isConfirmLoading}
                      >
                        Завершить сессию
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                На этом аккаунте нет других активных сессий.
              </div>
            )}
          </section>
        </>
      )}

      <Modal
        isOpen={isConfirmOpen}
        onClose={closeConfirmModal}
        title={getConfirmTitle(actionState)}
        closeLabel="Закрыть подтверждение действия"
      >
        <p className={styles.modalDescription}>
          {getConfirmDescription(actionState)}
        </p>

        <div className={styles.modalActions}>
          <Button
            type="button"
            variant="darkReverse"
            onClick={closeConfirmModal}
            disabled={isConfirmLoading}
          >
            Отмена
          </Button>

          <Button
            type="button"
            variant="dark"
            onClick={() => {
              void handleConfirmAction()
            }}
            disabled={isConfirmLoading}
          >
            {getConfirmButtonText(actionState, isConfirmLoading)}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

function formatSessionDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Невозможно определить'
  }

  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function getConfirmTitle(actionState: SessionActionState) {
  if (!actionState) return 'Подтверждение'

  if (actionState.type === 'logout-all') {
    return 'Выйти со всех устройств'
  }

  return 'Завершить сессию'
}

function getConfirmDescription(actionState: SessionActionState) {
  if (!actionState) return ''

  if (actionState.type === 'logout-all') {
    return 'Вы выйдете из аккаунта на этом и на всех других устройствах.'
  }

  return `Сессия "${actionState.session.deviceLabel}" будет завершена. Это действие нельзя отменить.`
}

function getConfirmButtonText(
  actionState: SessionActionState,
  isLoading: boolean,
) {
  if (!actionState) return 'Подтвердить'

  if (actionState.type === 'logout-all') {
    return isLoading ? 'Завершаем сессии...' : 'Выйти со всех устройств'
  }

  return isLoading ? 'Завершаем...' : 'Завершить сессию'
}
