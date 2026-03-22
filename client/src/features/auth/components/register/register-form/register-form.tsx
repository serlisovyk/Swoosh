'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useFavoriteProductIds } from '@features/favorites'
import { Button, Checkbox, Input } from '@shared/ui'
import { useRegisterForm } from '../../../hooks'
import { registerFormFields } from '../../../config'
import { RegisterFormData, RegisterPayload } from '../../../types'
import { ROUTES } from '@shared/config'
import styles from './register-form.module.css'
import { useRegisterMutation } from '../../../queries'
import { noop } from '@shared/utils'

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
        {registerFormFields.map(({ name, ...field }) => (
          <Input
            key={name}
            {...field}
            error={errors[name]?.message}
            {...register(name)}
          />
        ))}

        <Checkbox
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
        </Checkbox>

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
