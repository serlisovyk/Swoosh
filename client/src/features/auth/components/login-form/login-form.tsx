'use client'

import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import { useLoginMutation } from '../../queries'
import { useLoginForm } from '../../hooks'
import { loginFormFields } from '../../config'
import { LoginFormData } from '../../types'
import styles from './login-form.module.css'

export function LoginForm() {
  const { register, handleSubmit, errors } = useLoginForm()

  const { login, isLoading } = useLoginMutation()

  const onSubmit = async (data: LoginFormData) => await login(data)

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {loginFormFields.map(({ name, ...field }) => (
          <Input
            key={name}
            {...field}
            error={errors[name]?.message}
            {...register(name)}
          />
        ))}

        <Button
          type="submit"
          variant="darkReverse"
          icon={ArrowRight}
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти в кабинет'}
        </Button>
      </form>
    </div>
  )
}
