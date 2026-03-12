'use client'

import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import { useResetPasswordMutation } from '../../../queries'
import {
  useParseResetPasswordToken,
  useResetPasswordForm,
} from '../../../hooks'
import { resetPasswordFormFields } from '../../../config'
import { ResetPasswordFormData } from '../../../types'
import styles from './reset-password-form.module.css'

export function ResetPasswordForm() {
  const { token, tokenSuccess, tokenError } = useParseResetPasswordToken()

  const { register, handleSubmit, errors, setError } = useResetPasswordForm()

  const { resetPassword, isLoading } = useResetPasswordMutation()

  const onSubmit = async ({ newPassword }: ResetPasswordFormData) => {
    if (!tokenSuccess || !token) {
      setError('confirmPassword', {
        type: 'manual',
        message:
          tokenError?.issues[0]?.message ||
          'Ссылка для сброса пароля недействительна',
      })

      return
    }

    await resetPassword({ token, newPassword })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {resetPasswordFormFields.map(({ name, ...field }) => (
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
        >
          {isLoading ? 'Сохраняем...' : 'Сохранить пароль'}
        </Button>
      </form>
    </div>
  )
}
