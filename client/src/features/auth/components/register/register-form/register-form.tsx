'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useFavoriteProductIds } from '@features/favorites'
import { FIELD_VARIANTS, Field } from '@shared/form'
import { ROUTES } from '@shared/config'
import { Button } from '@shared/ui'
import { noop } from '@shared/utils'
import { AuthSocialButtons } from '../../social-auth-buttons'
import { Captcha } from '../../captcha'
import { registerFormFields } from '../../../config'
import { useRegisterForm } from '../../../hooks'
import { useRegisterMutation } from '../../../queries'
import { RegisterFormData, RegisterPayload } from '../../../types'
import styles from './register-form.module.css'

export function RegisterForm() {
  const { register, handleSubmit, errors } = useRegisterForm()

  const { register: registerMutation, isLoading } = useRegisterMutation()

  const favoriteProductIds = useFavoriteProductIds()

  const onSubmit = async (data: RegisterFormData) => {
    const { terms, confirmPassword, ...registerData } = data
    const payload: RegisterPayload = {
      ...registerData,
      favoriteProductIds,
    }

    noop(terms, confirmPassword)

    await registerMutation(payload)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <AuthSocialButtons />

        {registerFormFields.map(({ name, ...field }) => (
          <Field
            key={name}
            {...field}
            error={errors[name]?.message}
            {...register(name)}
          />
        ))}

        <Field
          variant={FIELD_VARIANTS.CHECKBOX}
          id="terms"
          required
          className={styles.checkbox}
          error={errors.terms?.message}
          {...register('terms')}
        >
          Я соглашаюсь на обработку персональных данных в соответствии с{' '}
          <Link
            href={ROUTES.PRIVACY_POLICY}
            target="_blank"
            className={styles.checkboxLink}
          >
            политикой конфиденциальности
          </Link>
        </Field>

        <Captcha />

        <Button
          type="submit"
          variant="darkReverse"
          icon={ArrowRight}
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>
    </div>
  )
}
