'use client'

import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import { useLoginForm } from '../../hooks'
import { loginFormFields } from '../../config'
import { LoginFormData } from '../../types'
import styles from './login-form.module.css'

export function LoginForm() {
  const { register, handleSubmit, errors, isFormValid } = useLoginForm()

  const onSubmit = (data: LoginFormData) => console.log(data)

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
          disabled={!isFormValid}
        >
          Войти в кабинет
        </Button>
      </form>
    </div>
  )
}
