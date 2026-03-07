'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button, Checkbox, Input } from '@shared/ui'
import { useRegisterForm } from '../../hooks'
import { registerFormFields } from '../../config'
import { RegisterFormData } from '../../types'
import styles from './register-form.module.css'

export function RegisterForm() {
  const { register, handleSubmit, errors, isFormValid } = useRegisterForm()

  const onSubmit = (data: RegisterFormData) => console.log(data)

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: Create Field component for group form items */}
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
          disabled={!isFormValid}
        >
          Создать аккаунт
        </Button>
      </form>
    </div>
  )
}
