'use client'

import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import { useChangePasswordMutation } from '../../queries'
import { useChangePasswordForm } from '../../hooks'
import { changePasswordFormFields } from '../../config'
import { ChangePasswordFormData } from '../../types'
import styles from './change-password-form.module.css'

export function ChangePasswordForm() {
  const { register, handleSubmit, errors } = useChangePasswordForm()

  const { changePassword, isLoading } = useChangePasswordMutation()

  const onSubmit = async (data: ChangePasswordFormData) => {
    await changePassword({ password: data.newPassword })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {changePasswordFormFields.map(({ name, ...field }) => (
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
          {isLoading ? 'Сохраняем...' : 'Сменить пароль'}
        </Button>
      </form>
    </div>
  )
}
