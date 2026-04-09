'use client'

import Link from 'next/link'
import { ROUTES } from '@shared/config'
import { FIELD_APPEARANCES, Field } from '@shared/form'
import { Button } from '@shared/ui'
import { useCreateNewsletterSubscriptionMutation } from '../../queries'
import { useNewsletterSubscriptionForm } from '../../hooks'
import type { NewsletterSubscriptionFormValues } from '../../types'
import styles from './newsletter-subscription-form.module.css'

export function NewsletterSubscriptionForm() {
  const { register, handleSubmit, reset, errors } =
    useNewsletterSubscriptionForm()

  const { createNewsletterSubscription, isLoading } =
    useCreateNewsletterSubscriptionMutation()

  const onSubmit = async (data: NewsletterSubscriptionFormValues) => {
    await createNewsletterSubscription(data)

    reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <Field
          id="newsletter-subscription-email"
          type="email"
          label="Ваш Email"
          autoComplete="email"
          inputMode="email"
          appearance={FIELD_APPEARANCES.UNDERLINE}
          error={errors.email?.message}
          disabled={isLoading}
          {...register('email')}
        />
      </div>

      <Button
        type="submit"
        variant="dark"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Подписываем...' : 'Подписаться'}
      </Button>

      <p className={styles.privacyText}>
        Согласен с{' '}
        <Link href={ROUTES.PRIVACY_POLICY} className={styles.privacyLink}>
          политикой конфиденциальности
        </Link>
      </p>
    </form>
  )
}
