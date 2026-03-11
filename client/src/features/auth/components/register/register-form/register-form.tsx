'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button, Checkbox, Input } from '@shared/ui'
import { useRegisterForm } from '../../../hooks'
import { registerFormFields } from '../../../config'
import { RegisterFormData } from '../../../types'
import styles from './register-form.module.css'
import { useRegisterMutation } from '../../../queries'
import { noop } from '@shared/utils'

export function RegisterForm() {
  const { register, handleSubmit, errors } = useRegisterForm()

  const { register: registerMutation, isLoading } = useRegisterMutation()

  const onSubmit = async (data: RegisterFormData) => {
    const { terms, confirmPassword, ...registerData } = data
    noop(terms, confirmPassword)
    await registerMutation(registerData)
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

        {/* TODO: create cookie privacy policy page */}
        <Checkbox
          id="terms"
          required
          className={styles.checkbox}
          error={errors.terms?.message}
          {...register('terms')}
        >
          Я соглашаюсь на обработку персональных данных в соответствии с{' '}
          <Link href="#!" target="_blank" className={styles.checkboxLink}>
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
