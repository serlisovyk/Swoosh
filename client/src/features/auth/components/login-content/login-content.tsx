'use client'

import { Button, Heading } from '@shared/ui'
import { ArrowRight, UserPlus2 } from 'lucide-react'
import styles from './login-content.module.css'

export function LoginContent() {
  return (
    <div className={styles.wrapper}>
      <div>
        <UserPlus2 size={40} className={styles.icon} />
      </div>
      <div>
        <Heading level={2} className={styles.title}>
          Еще нет аккаунта?
        </Heading>

        <div className={styles.description}>
          <strong>Регистрация на сайте</strong> позволяет получить доступ к
          статусу и истории вашего заказа. Просто заполните поля ниже, и вы
          получите учетную запись. Мы запрашиваем у вас только информацию,
          необходимую для того, чтобы сделать процесс покупки более быстрым и
          легким.
        </div>

        <Button variant="primary" icon={ArrowRight}>
          Зарегистрироваться
        </Button>
      </div>
    </div>
  )
}
