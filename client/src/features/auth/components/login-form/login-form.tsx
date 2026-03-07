'use client'

import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import styles from './login-form.module.css'

export function LoginForm() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Input
          type="email"
          label="Email"
          placeholder="Введите почту для авторизации"
          required
        />

        <Input
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          required
        />

        <Button
          type="submit"
          variant="darkReverse"
          icon={ArrowRight}
          className={styles.button}
        >
          Войти в кабинет
        </Button>
      </form>
    </div>
  )
}
