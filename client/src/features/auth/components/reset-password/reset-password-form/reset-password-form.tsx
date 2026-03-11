'use client'

import { useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import { useResetPasswordMutation } from '../../../queries'
import { useResetPasswordForm } from '../../../hooks'
import { resetPasswordFormFields } from '../../../config'
import { ResetPasswordFormData } from '../../../types'
import styles from './reset-password-form.module.css'

export function ResetPasswordForm() {
  const searchParams = useSearchParams()

  // TODO: add zod schema validation
  const token = searchParams.get('token')?.trim() ?? ''

  const { register, handleSubmit, errors, setError } = useResetPasswordForm()

  const { resetPassword, isLoading } = useResetPasswordMutation()

  const onSubmit = async ({ newPassword }: ResetPasswordFormData) => {
    if (!token) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Ссылка для сброса пароля недействительна',
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
