import { Heading } from '@shared/ui'
import { NewsletterSubscriptionForm } from '../newsletter-subscription-form'
import styles from './newsletter-subscription.module.css'

export function NewsletterSubscription() {
  return (
    <section
      className={styles.section}
      aria-labelledby="newsletter-subscription-title"
    >
      <div className="container">
        <div className={styles.box}>
          <Heading
            as="h2"
            className={styles.title}
            id="newsletter-subscription-title"
          >
            Подпишитесь на рассылку
          </Heading>

          <p className={styles.description}>
            Регулярные скидки и спецпредложения, а также новости компании.
          </p>

          <NewsletterSubscriptionForm />
        </div>
      </div>
    </section>
  )
}
