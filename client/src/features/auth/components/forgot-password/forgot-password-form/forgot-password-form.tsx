'use client'

import { ArrowRight, Info } from 'lucide-react'
import { Field } from '@shared/form'
import { Button } from '@shared/ui'
import { Captcha } from '../../captcha'
import { useRequestPasswordResetMutation } from '../../../queries'
import { useForgotPasswordForm } from '../../../hooks'
import { forgotPasswordFormFields } from '../../../config'
import { ForgotPasswordFormData } from '../../../types'
import styles from './forgot-password-form.module.css'

export function ForgotPasswordForm() {
  const { register, handleSubmit, errors } = useForgotPasswordForm()

  const { requestPasswordReset, isLoading, isSuccess } =
    useRequestPasswordResetMutation()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await requestPasswordReset(data)
  }

  if (isSuccess) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.successBox}>
          <Info size={30} />
          <p>
            Ссылка для сброса пароля и дальнейших инструкций отправлена вам на
            почту. Перейдите по ссылке и следуйте дальнейшим инструкциям.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.description}>
          <strong>Забыли свой пароль?</strong> Укажите свой Email или имя
          пользователя. Ссылку на создание нового пароля вы получите по
          электронной почте.
        </p>

        {forgotPasswordFormFields.map(({ name, ...field }) => (
          <Field
            key={name}
            {...field}
            error={errors[name]?.message}
            {...register(name)}
          />
        ))}

        <Captcha />

        <Button
          type="submit"
          variant="darkReverse"
          icon={ArrowRight}
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Отправляем...' : 'Сбросить пароль'}
        </Button>
      </form>
    </div>
  )
}
