'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button, Checkbox, Input } from '@shared/ui'
import styles from './register-form.module.css'

export function RegisterForm() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Input
          type="email"
          label="Email"
          placeholder="Введите почту для авторизации"
          required
        />

        <Input label="Имя" placeholder="Введите ваше имя" required />

        <Input
          label="Номер телефона"
          placeholder="Введите ваш номер телефона"
          required
        />

        <Input
          type="password"
          label="Пароль"
          placeholder="Придумайте пароль"
          required
        />

        <Input
          type="password"
          label="Повторите пароль"
          placeholder="Повторите пароль"
          required
        />

        {/* TODO: create cookie privacy policy page */}
        <Checkbox id="terms" required className={styles.checkbox}>
          Я соглашаюсь на обработку персональных данных в соответствии с{' '}
          <Link href="#!" target="_blank" className={styles.checkboxLink}>
            политикой конфиденциальности
          </Link>
        </Checkbox>

        <Button
          type="submit"
          variant="darkReverse"
          icon={ArrowRight}
          className={styles.button}
        >
          Создать аккаунт
        </Button>
      </form>
    </div>
  )
}
