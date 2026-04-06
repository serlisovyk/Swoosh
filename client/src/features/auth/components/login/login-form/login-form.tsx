'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useFavoriteProductIds } from '@features/favorites'
import { Field } from '@shared/form'
import { Button } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { AuthSocialButtons } from '../../social-auth-buttons'
import { Captcha } from '../../captcha'
import { useLoginMutation } from '../../../queries'
import { useLoginForm } from '../../../hooks'
import { loginFormFields } from '../../../config'
import { LoginFormData, LoginPayload } from '../../../types'
import styles from './login-form.module.css'

export function LoginForm() {
  const { register, handleSubmit, errors } = useLoginForm()

  const { login, isLoading } = useLoginMutation()

  const favoriteProductIds = useFavoriteProductIds()

  const onSubmit = async (data: LoginFormData) => {
    const payload: LoginPayload = {
      ...data,
      favoriteProductIds,
    }

    await login(payload)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <AuthSocialButtons />

        {loginFormFields.map(({ name, ...field }) => (
          <Field
            key={name}
            {...field}
            error={errors[name]?.message}
            {...register(name)}
          />
        ))}

        <Captcha />

        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className={styles.forgotPasswordLink}
        >
          Восстановить пароль
        </Link>

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
