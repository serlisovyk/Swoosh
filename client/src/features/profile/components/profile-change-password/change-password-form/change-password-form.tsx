'use client'

import { ArrowRight } from 'lucide-react'
import { Field } from '@shared/form'
import { Button } from '@shared/ui'
import { noop } from '@shared/utils'
import { useUpdateProfileMutation } from '../../../queries'
import { useChangePasswordForm } from '../../../hooks'
import { changePasswordFormFields } from '../../../config'
import { ChangePasswordFormData } from '../../../types'
import styles from './change-password-form.module.css'

export function ChangePasswordForm() {
  const { register, handleSubmit, errors } = useChangePasswordForm()

  const { updateProfile, isLoading } = useUpdateProfileMutation({
    toastMessage: 'Пароль успешно изменен!',
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    const { confirmPassword, ...changePasswordData } = data

    noop(confirmPassword)

    await updateProfile(changePasswordData)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {changePasswordFormFields.map(({ name, ...field }) => (
          <Field
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
