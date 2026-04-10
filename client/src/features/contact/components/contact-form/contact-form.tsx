'use client'

import Link from 'next/link'
import { ROUTES } from '@shared/config'
import { Field } from '@shared/form'
import { Button } from '@shared/ui'
import { useCreateContactRequestMutation } from '../../queries'
import { useContactForm } from '../../hooks'
import { contactFormFields } from '../../config'
import type { ContactFormValues, CreateContactRequestPayload } from '../../types'
import styles from './contact-form.module.css'

const [nameField, emailField, messageField] = contactFormFields

export function ContactForm() {
  const { register, handleSubmit, reset, errors } = useContactForm()

  const { createContactRequest, isLoading } = useCreateContactRequestMutation()

  const onSubmit = async (data: ContactFormValues) => {
    const payload: CreateContactRequestPayload = {
      ...data,
      message: data.message.trim() || undefined,
    }

    await createContactRequest(payload)

    reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <div className={styles.field}>
          <Field
            {...nameField}
            error={errors.name?.message}
            disabled={isLoading}
            {...register('name')}
          />
        </div>

        <div className={styles.field}>
          <Field
            {...emailField}
            error={errors.email?.message}
            disabled={isLoading}
            {...register('email')}
          />
        </div>
      </div>

      <div className={styles.messageField}>
        <Field
          {...messageField}
          error={errors.message?.message}
          disabled={isLoading}
          {...register('message')}
        />
      </div>

      <Button
        type="submit"
        variant="dark"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Отправляем...' : 'Отправить'}
      </Button>

      <p className={styles.privacyText}>
        Нажимая кнопку &quot;Отправить&quot; я соглашаюсь с{' '}
        <Link href={ROUTES.PRIVACY_POLICY} className={styles.privacyLink}>
          политикой конфиденциальности
        </Link>
      </p>
    </form>
  )
}
