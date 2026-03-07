'use client'

import { UserPlus2, ArrowRight } from 'lucide-react'
import { Heading, Button } from '@shared/ui'
import styles from './register-content.module.css'

export function RegisterContent() {
  return (
    <div className={styles.wrapper}>
      <div>
        <UserPlus2 size={40} className={styles.icon} />
      </div>
      <div>
        <Heading level={2} className={styles.title}>
          Уже есть аккаунт?
        </Heading>

        <div className={styles.description}>
          Перейдите к <strong>авторизации</strong> если у вас уже есть
          зарегистрированный аккаунт.
        </div>

        <Button variant="primary" icon={ArrowRight}>
          Авторизоваться
        </Button>
      </div>
    </div>
  )
}
