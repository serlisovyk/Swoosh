'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Field } from '@shared/form'
import { ROUTES } from '@shared/config'
import { Button } from '@shared/ui'
import { individualOrderFormFields } from '../../config'
import { useIndividualOrderForm } from '../../hooks'
import { useCreateIndividualOrderMutation } from '../../queries'
import type {
  CreateIndividualOrderPayload,
  IndividualOrderFormValues,
} from '../../types'
import styles from './individual-order-form.module.css'

export function IndividualOrderForm() {
  const { register, handleSubmit, reset, errors } = useIndividualOrderForm()

  const { createIndividualOrder, isLoading } =
    useCreateIndividualOrderMutation()

  const onSubmit = async (data: IndividualOrderFormValues) => {
    const payload: CreateIndividualOrderPayload = {
      ...data,
      message: data.message.trim() || undefined,
    }

    await createIndividualOrder(payload)

    reset()
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {individualOrderFormFields.map((field) => (
          <div key={field.name} className={styles.field}>
            <Field
              {...field}
              error={errors[field.name]?.message}
              disabled={isLoading}
              {...register(field.name)}
            />
          </div>
        ))}

        <Button
          type="submit"
          variant="primary"
          icon={ArrowRight}
          disabled={isLoading}
        >
          {isLoading ? 'Отправляем...' : 'Отправить'}
        </Button>

        <p className={styles.privacyText}>
          Нажимая кнопку &quot;Отправить&quot; я соглашаюсь с{' '}
          <Link
            href={ROUTES.PRIVACY_POLICY}
            target="_blank"
            className={styles.privacyLink}
          >
            политикой конфиденциальности
          </Link>
        </p>
      </form>
    </div>
  )
}
